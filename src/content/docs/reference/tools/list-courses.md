---
title: list_courses
description: List enrolled Moodle courses and optionally filter by academic year or semester.
---

Find the courses your faculty account is enrolled in. Use this tool before browsing a course or searching its materials.

## Parameters

Both parameters are optional. Send an empty object to request all enrolled courses.

| Parameter | Type | Meaning |
| --- | --- | --- |
| `academicYear` | string | Consecutive years in `YYYY/YYYY` format, such as `2026/2027`. |
| `semester` | string | `winter` or `summer`. |

You can use either filter on its own or combine them. Ask for the year explicitly; the server does not infer it from today's date.

## Try it in your client

> List my enrolled courses for the winter semester of 2026/2027.

Your client can call `list_courses` with:

```json
{
  "academicYear": "2026/2027",
  "semester": "winter"
}
```

To list all enrollments:

```json
{}
```

## What comes back

The result includes matching courses, the applied filters and information about incomplete results.

| Field | What to check |
| --- | --- |
| `courses` | Enrolled courses with their IDs, names, source URLs and inferred term labels. |
| `filters` | The requested year and semester, or `null` when omitted. |
| `unclassifiedCount` | Courses excluded because a requested label was unknown or conflicting. |
| `truncated` | Whether the upstream course listing may be incomplete. |
| `classificationSource` | An explanation of how year and semester labels were classified. |

Use a returned course ID with `get_course` to explore that course.

## Limitations

Year and semester are inferred from course names and short names. They are not official enrollment or calendar metadata.

Without filters, the result includes enrolled courses whose term labels are unknown. With filters, unresolved labels can exclude a possible match. An empty list does not prove that you have no matching enrollment when `unclassifiedCount` is greater than zero or `truncated` is true.

## Validation and access

The academic year must contain consecutive years. Values such as `2026/2028` are rejected. Semester values must be exactly `winter` or `summer`.

The tool requires a valid faculty session and only lists your enrolled courses. Authentication or request failures are returned as MCP errors.

[Back to all tools](/reference/tools/)
