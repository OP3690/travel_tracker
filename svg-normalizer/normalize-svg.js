const fs = require('fs');
const { JSDOM } = require('jsdom');

// Read the SVG file
const inputFile = '../WorldMap_SVG_Source.notepad';
const outputFile = '../WorldMap_SVG_Source.normalized.svg';

try {
    const svgContent = fs.readFileSync(inputFile, 'utf8');
    const dom = new JSDOM(svgContent);
    const document = dom.window.document;
    const svg = document.querySelector('svg');

    // Process all path and circle elements
    const elements = document.querySelectorAll('path, circle');
    elements.forEach(element => {
        // Find the parent g element or create one if it doesn't exist
        let parentG = element.parentElement;
        if (!parentG || parentG.tagName !== 'g') {
            parentG = document.createElement('g');
            element.parentNode.insertBefore(parentG, element);
            parentG.appendChild(element);
        }

        // If the g element doesn't have an id, create one
        if (!parentG.id) {
            const title = parentG.querySelector('title');
            if (title) {
                parentG.id = title.textContent.toLowerCase().replace(/\s+/g, '-');
            }
        }

        // If the g element doesn't have a title, create one
        if (!parentG.querySelector('title')) {
            const title = document.createElement('title');
            title.textContent = parentG.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            parentG.insertBefore(title, parentG.firstChild);
        }
    });

    // Get the normalized SVG content
    const normalizedSvg = svg.outerHTML;

    // Write the normalized SVG to a new file
    fs.writeFileSync(outputFile, normalizedSvg);
    console.log(`SVG normalized successfully! Output written to ${outputFile}`);
} catch (error) {
    console.error('Error processing SVG:', error);
} 