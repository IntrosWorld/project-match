"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Rocket } from "lucide-react";
import DiscoveryProjectCard from "@/app/components/feed/DiscoveryProjectCard";
import ProjectDetailsModal from "@/app/components/projects/ProjectDetailsModal";
import type { ProjectFeedItem } from "@/lib/project-types";

export default function ProjectBrowser({
  projects,
}: {
  projects: ProjectFeedItem[];
}) {
  const [projectItems, setProjectItems] = useState(projects);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({
    pointerId: -1,
    startX: 0,
    scrollLeft: 0,
    isPointerDown: false,
    didDrag: false,
  });

  useEffect(() => {
    setProjectItems(projects);
  }, [projects]);

  const selectedProject = useMemo(
    () =>
      projectItems.find((project) => project.id === selectedProjectId) ?? null,
    [projectItems, selectedProjectId],
  );

  const orderedProjects = useMemo(
    () => [...projectItems].reverse(),
    [projectItems],
  );

  const handleCommentCreated = (projectId: string) => {
    setProjectItems((current) =>
      current.map((project) =>
        project.id === projectId
          ? {
              ...project,
              commentsCount: project.commentsCount + 1,
            }
          : project,
      ),
    );
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const target = event.target as HTMLElement;
    if (target.closest("button, a, input, textarea")) {
      return;
    }

    const rail = railRef.current;
    if (!rail) {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: rail.scrollLeft,
      isPointerDown: true,
      didDrag: false,
    };

    rail.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    const dragState = dragStateRef.current;

    if (!rail || !dragState.isPointerDown || dragState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;

    if (!dragState.didDrag && Math.abs(deltaX) > 6) {
      dragState.didDrag = true;
    }

    if (!dragState.didDrag) {
      return;
    }

    rail.scrollLeft = dragState.scrollLeft - deltaX;
  };

  const finishPointerDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    const dragState = dragStateRef.current;

    if (!rail || dragState.pointerId !== event.pointerId) {
      return;
    }

    if (rail.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }

    dragStateRef.current = {
      pointerId: -1,
      startX: 0,
      scrollLeft: rail.scrollLeft,
      isPointerDown: false,
      didDrag: dragState.didDrag,
    };
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.didDrag) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    dragStateRef.current.didDrag = false;
  };

  if (projectItems.length === 0) {
    return (
      <div className="text-center space-y-6 py-20">
        <div className="p-6 bg-linear-to-tr from-primary/20 to-secondary/20 rounded-full w-fit mx-auto">
          <Rocket className="w-12 h-12 text-primary/60" />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <p className="text-gray-400 text-lg font-medium">
            No projects available yet
          </p>
          <p className="text-gray-500 text-sm">
            Create the first project or check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        ref={railRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointerDrag}
        onPointerCancel={finishPointerDrag}
        onPointerLeave={finishPointerDrag}
        onClickCapture={handleClickCapture}
        className="-mx-4 overflow-x-auto px-4 pb-5 sm:-mx-6 sm:px-6 cursor-grab touch-pan-x select-none active:cursor-grabbing [scrollbar-width:none]"
      >
        <div className="flex min-w-max gap-6 snap-x snap-mandatory pb-2">
          {orderedProjects.map((project, index) => (
            <div key={project.id} dir="ltr">
              <DiscoveryProjectCard
                project={project}
                index={index}
                onOpenDetails={(nextProject) =>
                  setSelectedProjectId(nextProject.id)
                }
              />
            </div>
          ))}
        </div>
      </div>

      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProjectId(null)}
        onCommentCreated={handleCommentCreated}
      />
    </>
  );
}
