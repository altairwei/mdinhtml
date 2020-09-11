const { extractMarkdownFromHtml } = require("../index")

function wrapTextInHtml5(text) {
    return `<!DOCTYPE html><html><head></head><body>${text}</body></html>`
}

test('Block element in markdown code', () => {
    expect(extractMarkdownFromHtml(
        wrapTextInHtml5("Hello <br/> World")
    )).toBe(
        "Hello \n\n World"
    );

    expect(extractMarkdownFromHtml(
        wrapTextInHtml5("<p>Hello World</p>")
    )).toBe(
        "Hello World\n"
    );

    expect(extractMarkdownFromHtml(
        wrapTextInHtml5("<p>Hello World</p><p>Hello Papa</p><p>Hello Afjs</p>")
    )).toBe(
        "Hello World\nHello Papa\nHello Afjs\n"
    );
});


test('htmlparser2 do not normalize whitespace', () => {
    expect(extractMarkdownFromHtml(
        wrapTextInHtml5("<p>Hello World</p>\n")
    )).toBe(
        "Hello World\n\n"
    );
});


test('Decode html entities', () => {
    expect(extractMarkdownFromHtml(
        wrapTextInHtml5("<p>&nbsp;&nbsp;Hello&nbsp;World&nbsp;</p>")
    )).toBe(
        "  Hello World \n"
    );

    expect(extractMarkdownFromHtml(
        wrapTextInHtml5("<p>`&amp;nbsp;`</p>")
    )).toBe(
        "`&nbsp;`\n"
    );

    expect(extractMarkdownFromHtml(
        wrapTextInHtml5("<p>`&lt;br/&gt;`</p>")
    )).toBe(
        "`<br/>`\n"
    );

    expect(extractMarkdownFromHtml(
        wrapTextInHtml5("<p>\"\"</p>")
    )).toBe(
        "\"\"\n"
    );
})


test('Markdown in <pre> tag', () => {
    expect(extractMarkdownFromHtml(
        wrapTextInHtml5("<pre>  # Hello World </pre>")
    )).toBe(
        "  # Hello World \n"
    );

    expect(extractMarkdownFromHtml(
        wrapTextInHtml5("<pre>  # Hello World </pre>")
    )).toBe(
        "  # Hello World \n"
    );
})