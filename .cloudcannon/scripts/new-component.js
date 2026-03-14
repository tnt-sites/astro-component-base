#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";

// Setup for interactive prompts
import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline/promises";

const rl = readline.createInterface({ input, output });

// Get component name from interactive prompt
async function getComponentName() {
  const componentName = await rl.question("Enter the component name: ");

  return componentName;
}

async function getKebabName(componentName) {
  return componentName
    .toLowerCase()
    .replace(/\s*-\s*/g, "-")
    .replace(/\s+/g, "-");
}

// Recursively select a folder inside baseDir with prompts
async function selectFolder(baseDir) {
  let entries;

  try {
    entries = await fs.readdir(baseDir, { withFileTypes: true });
  } catch (err) {
    console.error("Failed to read directory:", baseDir, err.message);

    return baseDir;
  }

  const folders = entries.filter((e) => e.isDirectory()).map((e) => e.name);

  console.log(`\nCurrent folder: ${baseDir}`);
  console.log("0) [current folder]");

  folders.forEach((folder, i) => {
    console.log(`${i + 1}) ${folder}`);
  });

  const answer = await rl.question("Enter the number of your choice: ");
  const choiceIndex = parseInt(answer.trim(), 10);

  if (isNaN(choiceIndex) || choiceIndex < 0 || choiceIndex > folders.length) {
    console.log("Invalid choice, please try again.");
    return selectFolder(baseDir); // ask again
  }

  if (choiceIndex === 0) {
    return baseDir;
  }

  const nextDir = path.join(baseDir, folders[choiceIndex - 1]);

  return selectFolder(nextDir);
}

function dedent(strings, ...values) {
  // Combine strings and values first
  const full = strings.reduce((acc, str, i) => acc + str + (values[i] || ""), "");

  // Match indentation from the first non-empty line
  const match = full.match(/^[ \t]*(?=\S)/gm);
  const indent = match ? Math.min(...match.map((m) => m.length)) : 0;

  // Remove common leading indentation
  return full.replace(new RegExp(`^[ \\t]{${indent}}`, "gm"), "");
}

async function createComponent(componentName, kebabName, componentFolderPath) {
  try {
    // Create the component folder
    await fs.mkdir(componentFolderPath, { recursive: true });
    console.log(`\n✓ Created directory: ${componentFolderPath}`);

    // Create relative path for use in component files
    const relativePath = path.relative(process.cwd(), componentFolderPath);
    // Create camelCase name for use in component files
    const camelCaseName = kebabName.replace(/(-\w)/g, (match) =>
      match.toUpperCase().replace("-", "")
    );
    // Create camelCase name with capital first letter for use in component files
    const capitalisedCamelCaseName = camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1);

    // Create the Astro file
    const astroContent = dedent`
    ---
    import CustomSection from "@builders/custom-section/CustomSection.astro";
    import Heading from "@core-elements/heading/Heading.astro";

    const {
      heading = "",
      backgroundColor = "base",
      backgroundImage,
      class: className,
      editable = true,
      ...rest
    } = Astro.props;

    const htmlAttributes = Object.fromEntries(
      Object.entries(rest).filter(([key]) => key !== "_component")
    );
    ---

    <CustomSection
      class:list={["${kebabName}", className]}
      maxContentWidth="2xl"
      paddingHorizontal="lg"
      paddingVertical="4xl"
      colorScheme="default"
      backgroundColor={backgroundColor}
      backgroundImage={backgroundImage}
      {...htmlAttributes}
    >
      <Heading level="h2" size="lg" alignX="center" text={heading} data-prop="heading" />
    </CustomSection>

    <style>
      .${kebabName} {
      }
    </style>
    `.trim();

    const astroFilePath = path.join(componentFolderPath, `${capitalisedCamelCaseName}.astro`);

    await fs.writeFile(astroFilePath, astroContent, { flag: "wx" });
    console.log(`✓ Created: ${capitalisedCamelCaseName}.astro`);

    // Create the structure-value file
    const structureValueContent = dedent`
    label: ${componentName}
    icon: add
    description: Description for ${componentName} component.
    value:
      _component: ${relativePath.replace("src/components/", "")}
      id: ""
      heading: "${componentName} <span class=\"heading-color\">Heading</span>"
      backgroundColor: base
      backgroundImage:
        source: null
        alt: null
        positionVertical: top
        positionHorizontal: center
    _inputs_from_glob:
      - /${relativePath}/${kebabName}.cloudcannon.inputs.yml
    `.trim();

    const structureValuePath = path.join(
      componentFolderPath,
      `${kebabName}.cloudcannon.structure-value.yml`
    );

    await fs.writeFile(structureValuePath, structureValueContent, { flag: "wx" });
    console.log(`✓ Created: ${kebabName}.cloudcannon.structure-value.yml`);

    // Create the inputs file
    const inputsContent = dedent`
    id:
      type: text
      comment: Optional HTML id attribute for this component.
    heading:
      type: markdown
      comment: Main heading text for the component. Supports inline span wrappers/classes for highlighted words.
      options:
        blockquote: false
        bold: true
        format: p
        italic: true
        link: true
        strike: false
        subscript: true
        superscript: true
        underline: false
        bulletedlist: false
        numberedlist: false
        styles: /.cloudcannon/styles/editor.css
    backgroundColor:
      type: select
      comment: Background color used behind the section.
      options:
        values:
          - id: none
            name: None
          - id: base
            name: Base
          - id: surface
            name: Surface
          - id: accent
            name: Accent
          - id: highlight
            name: Highlight
    backgroundImage:
      type: object
      comment: Background image configuration for the section.
      options:
        preview:
          icon: image
          text:
            - key: alt
            - Background Image
          subtext:
            - key: source
            - Add an image source
          image:
            - key: source
    backgroundImage.source:
      comment: URL or path to the background image.
      type: image
      options:
        paths:
          uploads: src/assets/images
          static: ""
    backgroundImage.alt:
      comment: Alt text for the background image.
      type: textarea
    backgroundImage.positionVertical:
      comment: Vertical position of the background image.
      type: select
      options:
        values:
          - id: top
            name: Top
          - id: center
            name: Center
          - id: bottom
            name: Bottom
    backgroundImage.positionHorizontal:
      comment: Horizontal position of the background image.
      type: select
      options:
        values:
          - id: left
            name: Left
          - id: center
            name: Center
          - id: right
            name: Right
    # Add your other component inputs here
    # Example:
    # text:
    #   type: text
    #   comment: The text content for the component.
    `.trim();

    const inputsPath = path.join(componentFolderPath, `${kebabName}.cloudcannon.inputs.yml`);

    await fs.writeFile(inputsPath, inputsContent, { flag: "wx" });
    console.log(`✓ Created: ${kebabName}.cloudcannon.inputs.yml`);

    // Create the snippets file
    const snippetsContent = dedent`
    ${camelCaseName}:
      template: mdx_component
      inline: false
      preview:
        text:
          - ${componentName}
        icon: add
      definitions:
        component_name: ${capitalisedCamelCaseName}
        named_args:
          - editor_key: id
            type: string
            optional: true
            remove_empty: true
          - editor_key: heading
            type: string
            optional: true
            remove_empty: true
          - editor_key: backgroundColor
            type: string
            optional: true
            remove_empty: true
          - editor_key: backgroundImage
            type: object
            optional: true
        # Add your component arguments here
        # Example:
        # - editor_key: text
        #   type: string
      _inputs_from_glob:
        - /${relativePath}/${kebabName}.cloudcannon.inputs.yml
    `.trim();

    const snippetsPath = path.join(componentFolderPath, `${kebabName}.cloudcannon.snippets.yml`);

    await fs.writeFile(snippetsPath, snippetsContent, { flag: "wx" });
    console.log(`✓ Created: ${kebabName}.cloudcannon.snippets.yml`);

    console.log("\n✨ Component created successfully!");
    console.log(`\nLocation: ${componentFolderPath}`);
    console.log("\nNext steps:");
    console.log("1. Edit the component files to add your functionality");
    console.log("2. Update the inputs.yml file with your component props");
    console.log("3. Update the snippets.yml file with your component arguments");
    console.log(
      "4. Create example markdown files in src/component-library/content/components/building-blocks/core-elements/${componentName}/examples/\n"
    );
  } catch (err) {
    if (err.code === "EEXIST") {
      console.error("Component already exists!");
    } else {
      console.error("Error creating component:", err);
    }
  }
}

(async () => {
  const baseComponentsDir = path.join(process.cwd(), "src", "components");

  try {
    const componentName = await getComponentName();
    const kebabName = await getKebabName(componentName);
    const targetFolder = await selectFolder(baseComponentsDir);

    console.log(`Component name: ${kebabName}`);
    console.log(`Target folder: ${targetFolder}`);

    const componentFolderPath = path.join(targetFolder, kebabName);

    await createComponent(componentName, kebabName, componentFolderPath);
  } finally {
    rl.close();
  }
})();
