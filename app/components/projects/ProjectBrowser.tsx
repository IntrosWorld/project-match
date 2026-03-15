"use client";

import { useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    setProjectItems(projects);
  }, [projects]);

  const selectedProject = useMemo(
    () =>
      projectItems.find((project) => project.id === selectedProjectId) ?? null,
    [projectItems, selectedProjectId],
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
      <div className="-mx-4 overflow-x-auto px-4 pb-5 sm:-mx-6 sm:px-6">
        <div className="flex min-w-max flex-row-reverse gap-6 snap-x snap-mandatory pb-2">
          {projectItems.map((project, index) => (
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
