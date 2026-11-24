---
title: search_courses
description: Search selected courses and explicitly chosen HTML or PDF resources.
---

Search across a small set of courses when you are unsure which one contains the information. Unlike [search_course](/reference/tools/search-course/), this tool returns ranked text snippets and can include supported HTML or PDF resources you explicitly select.

## Choose the scope

Use [list_courses](/reference/tools/list-courses/) to choose enrolled course IDs. Use [get_course](/reference/tools/get-course/) to discover resource links before selecting documents.

The search does not automatically read every linked document. For `documents`, use the numeric course-module ID from a discovered resource URL as `resourceId`, rather than the resource's structured `id` field.

## Parameters

| Parameter | Type | Required | Meaning |
| --- | --- | --- | --- |
| `courseIds` | number[] | Yes | Between 1 and 4 enrolled course IDs. Each must be a positive safe integer. |
| `query` | string | Yes | Between 1 and 200 characters after trimming. |
| `limit` | number | No | Maximum matches: an integer from 1 to 30. Defaults to 10. |
| `documents` | object[] | No | Up to 3 `{ courseId, resourceId }` selections. Both IDs are positive safe integers. The course must be selected and remain inside any filters. |
| `academicYear` | string | No | Consecutive years in `YYYY/YYYY` format, for example `2026/2027`. |
| `semester` | string | No | `winter` or `summer`. |
| `refresh` | boolean | No | Rebuild the search index from current evidence. Defaults to `false`. |

Year and semester filters narrow the selected IDs using course-name and short-name labels. They do not select additional courses or infer a semester from today's date. Unknown or conflicting labels are reported in `selection.unclassifiedCourseIds`.

## Try it in your client

> Find mentions of recursion across these two courses.

```json
{
  "courseIds": [123, 456],
  "query": "recursion",
  "limit": 5
}
```

To include a specific discovered document:

```json
{
  "courseIds": [123],
  "query": "recursion",
  "documents": [{ "courseId": 123, "resourceId": 789 }]
}
```

All IDs above are placeholders. Replace them with enrolled course IDs and a discovered resource's course-module ID.

## Read the result

| Field | Meaning |
| --- | --- |
| `status` | `read` or `partial`, describing the searched scope's coverage. |
| `matchStatus` | `found` when there are matches; otherwise `no_match` for complete coverage or `unknown` for incomplete coverage. |
| `matches` | Ranked snippets with `courseId`, `courseName`, `sourceName`, `url`, `page`, `excerpt`, `score` and `checkedAt`, plus index identifiers. |
| `truncated` | More matches were found than the requested limit. |
| `coverage` | Per-course status, checked time, source details, warnings, unavailable resource IDs and whether an index was reused. |
| `selection` | Requested, searched, filtered-out and unclassified course IDs, with filters and classification source. |
| `scope` | A description of the content included in this search. |

Matching uses normalized, case-insensitive word tokens. A snippet can match only some query words; its score counts distinct query terms present. This is keyword ranking, without synonym expansion or translation.

Use each snippet's returned source URL when citing it. PDF snippets include a page number; course-page and HTML snippets use `page: null`. A snippet is an excerpt, not the complete document.

## Coverage and refresh

The server verifies enrollment and reads current course evidence before considering a cached index. Where search-index caching is enabled, an index can be reused only when its evidence fingerprint matches. `refresh: true` forces a rebuild; it does not make unsupported content readable.

Only visible course text and explicitly selected supported HTML/PDF resources are in scope. Other documents and folder contents remain outside the search. Reader and indexing limits can produce partial coverage, so inspect warnings and source statuses even when matches are found.

An empty result applies only to the reported searched scope. If all requested courses are filtered out, check `selection` before drawing conclusions. A selected course outside your enrollment, or a document outside the selected course/filter scope, produces an error. Moodle access is read-only.

[Back to all tools](/reference/tools/)
