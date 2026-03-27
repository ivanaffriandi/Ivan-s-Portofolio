# IA-SYST // Content Management Guide

This guide explains how to update and maintain your personal journal using the lightweight JSON-based CMS.

## How to Add New Posts

All journal content is stored in [logs.json](file:///Users/ivanaffriandi/Ivan's%20Portofolio/logs.json). To add a new post, follow these steps:

1.  Open `logs.json`.
2.  Add a new JSON object to the top of the array:
    ```json
    {
      "id": "SYST-LIFE-XX",
      "date": "YYYY.MM.DD",
      "category": "thoughts",
      "readTime": "X MIN",
      "tags": ["TAG1", "TAG2"],
      "image": "path/to/your/image.png",
      "title": "Your Title Here",
      "summary": "A short 1-2 sentence overview.",
      "content": "Your full content in Markdown format."
    }
    ```
3.  **Images**: For the best aesthetic, use high-contrast monochrome images.
4.  **Content**: You can use standard **Markdown** in the `content` field:
    - `# Heading 1`, `## Heading 2`, `### Heading 3`
    - `**Bold Text**`, `*Italic Text*`
    - `> Blockquotes`
    - `- Bullet points` or `1. Numbered lists`
    - `` `Code snippets` `` or ` ``` Code blocks ``` `

## Categories
Currently supported categories for filtering:
- `thoughts`
- `lifestyle`
- `observations`
- `misc`

## Troubleshooting
- **Invalid JSON**: If the page doesn't load, check your `logs.json` for missing commas or quotes. Use a JSON validator if needed.
- **Images Not Loading**: Ensure the image path is correct relative to the website root.
