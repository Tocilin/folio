import path from "path";
import { fileURLToPath } from "url";
import React from "react";
import { Document, Page, Text, View, Link, StyleSheet, renderToFile } from "@react-pdf/renderer";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const resume = require("../data/resume.json");
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const e = React.createElement;

// Helvetica's built-in WinAnsi encoding has no glyph for → — swap it for an ASCII arrow.
const pdfSafe = (text) => text.replace(/→/g, "->");

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    color: "#111111",
    fontFamily: "Helvetica",
    padding: 40,
    fontSize: 10,
  },
  sidebar: {
    width: "32%",
    paddingRight: 24,
  },
  main: {
    width: "68%",
  },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 16,
    marginBottom: 4,
  },
  title: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 18,
  },
  sectionHeading: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    marginBottom: 10,
  },
  contactLine: {
    fontSize: 10,
    marginBottom: 6,
    color: "#111111",
  },
  link: {
    color: "#111111",
    textDecoration: "underline",
  },
  entry: {
    marginBottom: 12,
  },
  entryHeader: {
    flexDirection: "row",
    marginBottom: 2,
  },
  role: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
  },
  at: {
    fontSize: 11,
    color: "#666666",
  },
  company: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: "#666666",
  },
  dates: {
    fontSize: 9,
    color: "#888888",
    marginBottom: 6,
  },
  description: {
    fontSize: 10,
    lineHeight: 1.4,
    color: "#333333",
  },
  linkedinRow: {
    marginTop: 2,
    marginBottom: 18,
    alignItems: "center",
  },
  educationEntry: {
    marginBottom: 8,
  },
  degree: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
  },
  school: {
    fontSize: 11,
    color: "#666666",
  },
});

function ResumeDocument() {
  return e(
    Document,
    null,
    e(
      Page,
      { size: "A4", style: styles.page },
      e(
        View,
        { style: styles.sidebar },
        e(Text, { style: styles.name }, resume.name),
        e(Text, { style: styles.title }, resume.title),
        e(Text, { style: styles.sectionHeading }, "Contact"),
        e(Link, { src: resume.contact.websiteHref, style: [styles.contactLine, styles.link] }, resume.contact.website),
        e(Text, { style: styles.contactLine }, resume.contact.email),
        e(Text, { style: styles.contactLine }, resume.contact.phone)
      ),
      e(
        View,
        { style: styles.main },
        e(Text, { style: styles.sectionHeading }, "Experience"),
        ...resume.experience.map((entry) =>
          e(
            View,
            { style: styles.entry, key: `${entry.company}-${entry.role}` },
            e(
              View,
              { style: styles.entryHeader },
              e(Text, { style: styles.role }, pdfSafe(entry.role) + " "),
              e(Text, { style: styles.at }, "@ "),
              e(Text, { style: styles.company }, entry.company)
            ),
            e(Text, { style: styles.dates }, entry.dates),
            e(Text, { style: styles.description }, entry.description)
          )
        ),
        e(
          View,
          { style: styles.linkedinRow },
          e(Link, { src: resume.linkedinHref, style: styles.link }, "View full work history on LinkedIn ->")
        ),
        e(Text, { style: styles.sectionHeading }, "Education"),
        ...resume.education.map((entry) =>
          e(
            View,
            { style: styles.educationEntry, key: entry.degree },
            e(Text, { style: styles.degree }, entry.degree),
            e(Text, { style: styles.school }, entry.school),
            e(Text, { style: styles.dates }, entry.dates)
          )
        )
      )
    )
  );
}

renderToFile(e(ResumeDocument), path.join(__dirname, "..", "public", "Eugene_Tochilin_Resume.pdf"))
  .then(() => {
    console.log("Generated public/Eugene_Tochilin_Resume.pdf");
  })
  .catch((err) => {
    console.error("Failed to generate resume PDF:", err);
    process.exit(1);
  });
