"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { createJobApplication } from "@/lib/actions/job-applications";

interface CreateJobApplicationDialogProps {
    columnId: string;
    boardId: string;
}

const INITIAL_FORM_DATA = {
    company: "",
    position: "",
    location: "",
    notes: "",
    salary: "",
    jobUrl: "",
    tags: "",
    description: "",
}

export default function CreateJobApplicationDialog({
    columnId,
    boardId,
}: CreateJobApplicationDialogProps) {

    // States
    const [open, setOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);

    async function handleSubmit(e: React.FormEvent

    ) {
        e.preventDefault();

        try {
            const result = await createJobApplication({
                ...formData,
                columnId,
                boardId,
                tags: formData.tags
                    .split(",")
                    .map(tag => tag.trim()).filter(tag => tag !== "")
            });

            if (!result.error) {
                setFormData(INITIAL_FORM_DATA);
                setOpen(false);
            } else {
                console.error("Error creating job application:", result.error);
            }

        } catch (err) {
            console.error(err);
        }
    }


    return <>
        <Dialog open={open} onOpenChange={setOpen}>
            {/* <DialogTrigger>
                <Button variant="outline"
                    className="w-full mb-4 justify-start text-muted-foreground border-dashed border-2 hover:border-solid hover:bg-muted/50"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Job
                </Button>
            </DialogTrigger> */}
            <DialogTrigger
                render={
                    <Button
                        variant="outline"
                        className=" mb-4 justify-start text-muted-foreground border-dashed border-2 hover:border-solid hover:bg-muted/50"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Job
                    </Button>
                }
            />
            <DialogContent className="flex max-h-[calc(100dvh-1rem)] max-w-[calc(100%-1rem)] flex-col gap-0 overflow-hidden p-0 sm:max-h-[calc(100dvh-2rem)] sm:max-w-2xl">
                <DialogHeader className="shrink-0 px-4 pt-4 pr-12 sm:px-6 sm:pt-6 sm:pr-12">
                    <DialogTitle>Add Job Application</DialogTitle>
                    <DialogDescription>Track a new job application
                    </DialogDescription>
                </DialogHeader>
                <form className="flex min-h-0 flex-1 flex-col overflow-hidden" onSubmit={handleSubmit}>
                    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="company">Compaany *</Label>
                                <Input id="company"
                                    required
                                    value={formData.company}
                                    onChange={(e) =>
                                        setFormData({ ...formData, company: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="position">Position *</Label>
                                <Input id="position"
                                    required
                                    value={formData.position}
                                    onChange={(e) =>
                                        setFormData({ ...formData, position: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location"
                                    value={formData.location}
                                    onChange={(e) =>
                                        setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="salary">Salary</Label>
                                <Input id="salary"
                                    value={formData.salary}
                                    onChange={(e) =>
                                        setFormData({ ...formData, salary: e.target.value })}
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
                                    setFormData({ ...formData, jobUrl: e.target.value })}

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
                            onClick={() => setOpen(false)}
                        >Cancel</Button>
                        <Button type="submit" className="w-full sm:w-auto">Add Application</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    </>
}
