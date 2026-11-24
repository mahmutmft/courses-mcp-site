---
title: search_course
description: Find matching section and activity text in one enrolled course.
---

Find where a topic appears on a course page. `search_course` searches discovered section headings, summaries, activity titles and descriptions, then returns matching entries with their source information.

## Before you start

Choose a course with [list_courses](/reference/tools/list-courses/) and use its numeric `id` as `courseId`. You can first call [get_course](/reference/tools/get-course/) to browse its sections and resource links.

The server checks that the course is in your enrolled list.

## Parameters

| Parameter | Type | Required | Meaning |
| --- | --- | --- | --- |
| `courseId` | number | Yes | A positive safe integer identifying an enrolled course. |
| `query` | string | Yes | Search text, trimmed to between 1 and 200 characters. |
| `limit` | number | No | Maximum matches to return: an integer from 1 to 100. Defaults to 30. |

## Try it in your client

> Find mentions of recursion in this course's sections and activities.

Your client can call:

```json
{
  "courseId": 123,
  "query": "recursion",
  "limit": 10
}
```

The ID `123` is an example. Replace it with one returned by `list_courses`.

Matching ignores letter case and normalizes Unicode text. It looks for the query as a literal substring; it does not expand synonyms or translate your query. Use words in the language of the course materials.

## What comes back

| Field | Meaning |
| --- | --- |
| `courseId`, `query` | The course and search text used. |
| `matches` | Matching sections or activities, in discovery order. |
| `truncated` | Whether more matches were found than the requested `limit`. |
| `coverage` | Course discovery coverage, when supplied by the course reader. |
| `scope` | A description of which course text was searched. |

A section match includes `section`, `name`, `url` and an `excerpt` containing its summary. An activity match includes `section` and the discovered resource's `id`, `name`, `url` and `description`. Some resources may not have a usable link.

## Understand the limits

This tool searches text discovered on supported course pages. Folder contents, linked files and PDF text are not indexed. Full activity pages and forum discussions are not searched by this tool. Use the appropriate reading tool to inspect a resource separately.

`truncated` describes the result limit. It is separate from `coverage.partial`, which indicates incomplete course discovery. Increasing `limit` can return more matches, but it cannot recover pages that were not read.

Check coverage warnings before treating an empty result as evidence that a topic is absent. The information may be inside a linked resource or outside the discovered scope. Moodle access remains read-only.

[Back to all tools](/reference/tools/)
