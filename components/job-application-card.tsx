import { Column, JobApplication } from "@/lib/models/models.types";
import { Card, CardContent } from "./ui/card";
import { ExternalLink, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
interface JobApplicationCardProps {
    job: JobApplication;
    columns: Column[];
}

export default function JobApplicationCard({ job, columns }: JobApplicationCardProps) {
    return (
        <>
            <Card>
                <CardContent>
                    <div>
                        <div>
                            <h3>{job.position}</h3>
                            <p>{job.company}</p>
                            {job.description && <p>{job.description}</p>}

                            {job.tags && job.tags.length > 0 && (
                                <div>
                                    {job.tags.map((tag, key) => (
                                        <span key={key}>{tag}</span>
                                    ))}
                                </div>
                            )}

                            {job.jobUrl && (
                                <a
                                    target="_blank"
                                    href={job.jobUrl}
                                    onClick={(e) => e.stopPropagation()}
                                    className="">
                                    <ExternalLink />

                                </a>
                            )}
                        </div>
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant="ghost" size="icon" >
                                        <MoreVertical />
                                    </Button>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}