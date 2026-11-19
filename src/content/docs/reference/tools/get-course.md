---
title: get_course
description: Browse the sections and discovered resources of an enrolled Moodle course.
---

Open a course from your enrolled list and see how its materials are organized. The result gives your client section summaries and resource links to use in later tool calls.

## Before you start

Call [list_courses](/reference/tools/list-courses/) and choose a course from the result. Use its numeric `id` as `courseId`.

The server checks enrollment. Knowing another course's ID does not grant access to it.

## Parameter

| Parameter | Type | Required | Meaning |
| --- | --- | --- | --- |
| `courseId` | number | Yes | A positive safe integer identifying an enrolled Moodle course. |

## Try it in your client

> Show me the sections and available materials for this course.

Your client can call `get_course` with:

```json
{
  "courseId": 123
}
```

The number `123` is an example. Replace it with an ID returned by `list_courses`.

## What comes back

| Field | Meaning |
| --- | --- |
| `id`, `name`, `url` | The course identity and source page. |
| `sections` | Discovered sections with `id`, `number`, `name`, `url`, `summary` and `resources`. |
| `resources` within a section | Discovered activities or materials with `id`, `name`, `url` and `description`. |
| `coverage` | Whether discovery was partial, pages visited and warnings. |

Resource links are deduplicated when they appear on multiple discovered pages. A resource may have a description without a usable link.

## Check the coverage

The reader starts with the main course page and follows supported section links it discovers there. If a child page cannot be read, the result keeps the sections that were successfully retrieved and reports partial coverage.

Check `coverage.partial`, `coverage.pagesVisited` and `coverage.warnings`. A complete result means no detected failures within the supported discovery scope. It does not guarantee that every Moodle activity or JavaScript-only layout was inspected.

If the main course page cannot be read, or no supported sections can be found, the tool returns an error.

## Continue with a resource

Use the discovered links to choose the next step:

- `read_resource` reads a supported Moodle page or PDF.
- `get_folder` discovers files inside a supported folder.
- `get_assignment` reads an assignment description and its published dates.

For tools that take an activity ID, use the numeric course-module ID in the discovered resource URL. The resource's returned `id` is a structured identifier and is not the numeric argument for those tools.

## Limits and access

Discovery is bounded to 20 logical pages, 200 sections and 1,000 resources, with a 30-second traversal budget after enrollment lookup. Limits or unavailable pages can produce partial results.

The tool browses supported course pages. It does not expand folders, read linked files or submit coursework. Moodle access is read-only.

[Back to all tools](/reference/tools/)
