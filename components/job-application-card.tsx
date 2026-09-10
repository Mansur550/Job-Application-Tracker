"use client";

import { Column, JobApplication } from "@/lib/models/models.types";
import { Card, CardContent } from "./ui/card";
import { Edit2, ExternalLink, MoreVertical, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { deleteJobApplication, updateJobApplication } from "@/lib/actions/job-applications";


import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";



interface JobApplicationCardProps {
    job: JobApplication;
    columns: Column[];
}

export default function JobApplicationCard({ job, columns }: JobApplicationCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        company: job.company,
        position: job.position,
        location: job.location || "",
        notes: job.notes || "",
        salary: job.salary || "",
        jobUrl: job.jobUrl || "",
        columnId: job.columnId || "",
        tags: job.tags?.join(", ") || "",
        description: job.description || "",
    });

    const visibleTags = job.tags?.slice(0, 2) ?? [];
    const remainingTagCount = Math.max((job.tags?.length ?? 0) - visibleTags.length, 0);


    // Handle Update
    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        try {
            const result = await updateJobApplication(job._id, {
                ...formData,
                tags: formData.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag.length > 0),
            });

            if (!result.error) {
                setIsEditing(false);
            }
        } catch (err) {
            console.error("Failed to move job application: ", err);
        }
    }

    async function handleDelete() {
        try {
            const result = await deleteJobApplication(job._id);

            if (result.error) {
                console.error("Failed to delete job application:", result.error);
            }
        } catch (err) {
            console.error("Failed to move job application: ", err);
        }
    }

    async function handleMove(newColumnId: string) {
        try {
            await updateJobApplication(job._id, {
                columnId: newColumnId,
            });
        } catch (err) {
            console.error("Failed to move job application: ", err);
        }
    }

    return (
        <>
            <Card
                className="group w-full min-w-0 gap-0 overflow-hidden bg-white py-0 shadow-sm transition-shadow hover:shadow-lg"
            >
                <CardContent className="min-w-0 overflow-hidden p-4">
                    <div className="flex min-w-0 items-start justify-between gap-2">
                        <div className="min-w-0 flex-1 overflow-hidden">
                            <h3
                                className="mb-1 line-clamp-2 text-sm font-semibold [overflow-wrap:anywhere]"
                                title={job.position}
                            >
                                {job.position}
                            </h3>
                            <p className="mb-2 truncate text-xs text-muted-foreground" title={job.company}>
                                {job.company}
                            </p>
                            {job.description && (
                                <p className="mb-2 line-clamp-2 whitespace-pre-line text-xs text-muted-foreground [overflow-wrap:anywhere]">
                                    {job.description}
                                </p>
                            )}

                            {visibleTags.length > 0 && (
                                <div className="mb-2 flex min-w-0 max-w-full flex-nowrap gap-1 overflow-hidden">
                                    {visibleTags.map((tag, key) => (
                                        <span
                                            key={key}
                                            className="min-w-0 max-w-28 truncate rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                            title={tag}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {remainingTagCount > 0 && (
                                        <span
                                            className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                                            title={`${remainingTagCount} more tags`}
                                        >
                                            +{remainingTagCount}
                                        </span>
                                    )}
                                </div>
                            )}

                            {job.jobUrl && (
                                <a
                                    href={job.jobUrl}
                                    target="_blank"
                                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ExternalLink className="h-3 w-3" />

                                </a>
                            )}
                        </div>
                        <div className="flex shrink-0 items-start gap-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setIsEditing(true)}>
                                        <Edit2 className="mr-2 h-4 w-4" />
                                        Edit
                                    </DropdownMenuItem>
                                    {columns.length > 1 && (
                                        <>
                                            {columns.filter((c) => c._id !== job.columnId)
                                                .map((column, key) => (
                                                    <DropdownMenuItem key={key} onClick={() => handleMove(column._id)}>
                                                        Move to {column.name}
                                                    </DropdownMenuItem>
                                                ))}
                                        </>
                                    )}

                                    <DropdownMenuItem className="text-destructive" onClick={()=> handleDelete()}>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardContent>
            </Card>



            <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogContent className="flex max-h-[calc(100dvh-1rem)] max-w-[calc(100%-1rem)] flex-col gap-0 overflow-hidden p-0 sm:max-h-[calc(100dvh-2rem)] sm:max-w-2xl">
                    <DialogHeader className="shrink-0 px-4 pt-4 pr-12 sm:px-6 sm:pt-6 sm:pr-12">
                        <DialogTitle>Edit Job Application</DialogTitle>
                        <DialogDescription>Update the details of this job application</DialogDescription>
                    </DialogHeader>
                    <form className="flex min-h-0 flex-1 flex-col overflow-hidden" onSubmit={handleUpdate}>
                        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="company">Company *</Label>
                                    <Input
                                        id="company"
                                        required
                                        value={formData.company}
                                        onChange={(e) =>
                                            setFormData({ ...formData, company: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="position">Position *</Label>
                                    <Input
                                        id="position"
                                        required
                                        value={formData.position}
                                        onChange={(e) =>
                                            setFormData({ ...formData, position: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={formData.location}
                                        onChange={(e) =>
                                            setFormData({ ...formData, location: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="salary">Salary</Label>
                                    <Input
                                        id="salary"
                                        placeholder="e.g., $100k - $150k"
                                        value={formData.salary}
                                        onChange={(e) =>
                                            setFormData({ ...formData, salary: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="jobUrl">Job URL</Label>
                                <Input
                                    id="jobUrl"
                                    type="url"
                                    placeholder="https://..."
                                    value={formData.jobUrl}
                                    onChange={(e) =>
                                        setFormData({ ...formData, jobUrl: e.target.value })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags (comma-separated)</Label>
                                <Input
                                    id="tags"
                                    placeholder="React, Tailwind, High Pay"
                                    value={formData.tags}
                                    onChange={(e) =>
                                        setFormData({ ...formData, tags: e.target.value })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    className="h-32 min-h-32 max-h-32 field-sizing-fixed resize-none overflow-y-auto"
                                    placeholder="Brief description of the role..."
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    className="h-24 min-h-24 max-h-24 field-sizing-fixed resize-none overflow-y-auto"
                                    value={formData.notes}
                                    onChange={(e) =>
                                        setFormData({ ...formData, notes: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        <DialogFooter className="mx-0 mb-0 shrink-0 px-4 py-3 sm:px-6 sm:py-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full sm:w-auto"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="w-full sm:w-auto">Save Changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

        </>
    );
}
