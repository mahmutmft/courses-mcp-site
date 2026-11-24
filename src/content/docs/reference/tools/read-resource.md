---
title: read_resource
description: Read a discovered Moodle HTML page or a text-based PDF with page citations.
---

Read the content behind a supported resource link. Use [get_course](/reference/tools/get-course/) to find the resource first, then ask your client to read it.

## Choose a resource

Use the enrolled course's numeric ID as `courseId`. For `resourceId`, use the numeric course-module ID in the discovered URL, such as `789` in `/mod/resource/view.php?id=789`. The resource's structured `id` field is not this numeric argument.

The server verifies enrollment and checks that the resource appears in the course discovery result. A missing resource may reflect incomplete discovery; inspect the course coverage warnings.

## Parameters

| Parameter | Type | Required | Meaning |
| --- | --- | --- | --- |
| `courseId` | number | Yes | An enrolled course ID, as a positive safe integer. |
| `resourceId` | number | Yes | A discovered course-module ID, as a positive safe integer. |
| `startPage` | number | No | PDF only: a positive safe integer selecting the first page of a batch. Page numbering starts at 1. |

## Try it in your client

> Read this course resource and cite the source. If it is a PDF, include page numbers.

```json
{
  "courseId": 123,
  "resourceId": 789
}
```

These IDs are placeholders. Replace them with an enrolled course and a discovered resource.

## Read the result

Common fields include `courseId`, `resourceId`, `name`, `sourceUrl`, `checkedAt`, `status`, `text`, `tables`, `links`, `truncated`, `coverage`, `warnings` and `scope`.

| Status | Meaning |
| --- | --- |
| `read` | The supported resource content was read within the reader's scope. |
| `partial` | Some text was read, but warnings or output limits indicate incomplete content. |
| `unsupported` | No supported readable content was returned. Inspect warnings for the reason. |

`coverage` describes course discovery; resource warnings and status describe the reading operation. Check both. Some access, ownership, network or unsafe-redirect failures return a tool error instead of a resource result.

Supported HTML pages return extracted text, bounded tables and permitted discovered Moodle links. Tables with merged cells or nested tables can carry `unsupportedLayout: true`; do not assume their structure has been reconstructed. URL activities may expose a supported Moodle destination, but external sites are not browsed.

## Continue through a PDF

PDF results include `format: "pdf"`, `pageCount`, `pages`, `startPage`, `nextPage`, `emptyPages`, `failedPages` and `partialPages`. Each returned page has `pageNumber`, `text` and `sourceUrl`.

When `nextPage` is a number, call the same resource again with that value as `startPage`. For example, if it returns `nextPage: 31`:

```json
{
  "courseId": 123,
  "resourceId": 789,
  "startPage": 31
}
```

Continue until `nextPage` is `null`. That means there is no next batch; it does not resolve failed or partially extracted pages. Inspect `failedPages`, `partialPages`, `emptyPages` and warnings before claiming the whole PDF was read. `startPage` is rejected for HTML resources.

## Limits and sources

PDF reading supports text extraction without OCR. Scanned pages may return no text. The current limits are 10 MiB per PDF, up to 30 pages and 60,000 characters per batch, with a 10-second parsing budget. HTML text is limited to 20,000 characters, with separate table and link limits.

Use `sourceUrl` and PDF page numbers when citing information. The tool does not expand folders, submit forms, browse external origins or infer lab schedules. Moodle access is read-only.

[Back to all tools](/reference/tools/)
