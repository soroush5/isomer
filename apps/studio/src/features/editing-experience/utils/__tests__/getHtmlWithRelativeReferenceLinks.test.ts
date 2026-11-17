import { describe, expect, it } from "vitest"

import { getHtmlWithRelativeReferenceLinks } from "../getHtmlWithRelativeReferenceLinks"

describe("getHtmlWithRelativeReferenceLinks", () => {
  it("should convert an absolute reference link into a relative one", () => {
    // Arrange
    const html = `<a href="https://studio.isomer.gov.sg/sites/1/pages/[resource:1:2]">form</a>`

    // Act
    const result = getHtmlWithRelativeReferenceLinks(html)

    // Assert
    expect(result).toBe(`<a href="[resource:1:2]">form</a>`)
  })

  it("should keep links and text that come before an absolute reference link", () => {
    // Arrange
    const html = `Read the <a href="https://www.moh.gov.sg/guidelines">MOH guidelines</a> first, then fill in <a href="https://studio.isomer.gov.sg/sites/1/pages/[resource:1:2]">our form</a>.`

    // Act
    const result = getHtmlWithRelativeReferenceLinks(html)

    // Assert
    expect(result).toBe(
      `Read the <a href="https://www.moh.gov.sg/guidelines">MOH guidelines</a> first, then fill in <a href="[resource:1:2]">our form</a>.`,
    )
  })

  it("should convert every absolute reference link in the pasted content", () => {
    // Arrange
    const html = `<a href="https://studio.isomer.gov.sg/sites/1/pages/[resource:1:2]">one</a> and <a href="https://studio.isomer.gov.sg/about">two</a> and <a href="http://localhost:3000/sites/1/pages/[resource:1:3]">three</a>`

    // Act
    const result = getHtmlWithRelativeReferenceLinks(html)

    // Assert
    expect(result).toBe(
      `<a href="[resource:1:2]">one</a> and <a href="https://studio.isomer.gov.sg/about">two</a> and <a href="[resource:1:3]">three</a>`,
    )
  })

  it("should leave content without reference links unchanged", () => {
    // Arrange
    const html = `<a href="https://www.moh.gov.sg/guidelines">MOH guidelines</a>`

    // Act
    const result = getHtmlWithRelativeReferenceLinks(html)

    // Assert
    expect(result).toBe(html)
  })
})
