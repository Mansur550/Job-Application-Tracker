"use client";

import { Board, Column, JobApplication } from "@/lib/models/models.types";
import { Award, Calendar, CheckCircle2, Mic, MoreVertical, Trash2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import CreateJobApplicationDialog from "./crate-job-dialog";
import JobApplicationCard from "./job-application-card";
import { useBoard } from "@/lib/hooks/useBoards";





interface kanbanBoardProps {
    board: Board;
    userId: string;
}

interface ColConfig {
    color: string;
    icon: React.ReactNode
}

const COLUMN_CONFIG: Array<ColConfig> = [
    {
        color: "bg-cyan-500",
        icon: <Calendar className="h-4 w-4" />
    },
    {
        color: "bg-purple-500",
        icon: <CheckCircle2 className="h-4 w-4" />
    },
    {
        color: "bg-green-500",
        icon: <Mic className="h-4 w-4" />
    },
    {
        color: "bg-yellow-300",
        icon: <Award className="h-4 w-4" />
    },
    {
        color: "bg-red-500",
        icon: <XCircle className="h-4 w-4" />
    }
]

function DroppableColumn({
    column,
    config,
    boardId,
    sortedColumns,
}: {
    column: Column;
    config: ColConfig;
    boardId: string;
    sortedColumns: Column[];
}) {
    const sortedJobs =
        column.jobApplications?.sort((a, b) => a.order - b.order) || [];


    return <Card className="w-[85vw] max-w-[20rem] min-w-0 flex-none gap-0 overflow-hidden p-0 shadow-md">
        <CardHeader className={`${config.color} min-w-0 rounded-t-lg py-3 text-white`}>
            <div className="flex min-w-0 items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                    {config.icon}
                    <CardTitle className="truncate text-base font-semibold text-white">
                        {column.name}
                    </CardTitle>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost"
                            size="icon"
                            className="h-6 w-6 shrink-0 text-white hover:bg-white/20">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Column
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </CardHeader>

        <CardContent className="min-h-[400px] min-w-0 space-y-2 overflow-hidden rounded-b-lg bg-gray-50 pt-4">

            {sortedJobs.map((job, key) => (
                <SortableJobCard
                    key={key}
                    job={{ ...job, columnId: job.columnId || column._id }}
                    columns={sortedColumns}

                />
            ))}

            <CreateJobApplicationDialog columnId={column._id} boardId={boardId} />
        </CardContent>

    </Card>
}

function SortableJobCard({ job, columns }: { job: JobApplication; columns: Column[] }) {
    return <div className="min-w-0 max-w-full">
        <JobApplicationCard job={job} columns={columns}/>
    </div>
}

export default function KanbanBoard({ board }: kanbanBoardProps) {
    // const columns = board.columns;
    const { columns } = useBoard(board);

    const sortedColumns =
        columns?.sort((a, b) => a.order - b.order) || [];
    return (
        <>
            <div className="min-w-0 space-y-4">
                <div className="flex w-full max-w-full items-start gap-4 overflow-x-auto overscroll-x-contain pb-4">
                    {columns.map((col, key) => {
                        const config = COLUMN_CONFIG[key] || {
                            color: "bg-gray-500",
                            icon: <Calendar className="h-4 w-4" />,
                        };
                        return <DroppableColumn
                            key={key}
                            column={col}
                            config={config}
                            boardId={board._id}
                            sortedColumns={sortedColumns}

                        />
                    })}
                </div>
            </div>
        </>
    )
}
