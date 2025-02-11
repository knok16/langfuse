import Header from "@/src/components/layouts/header";
import { DatasetRunsTable } from "@/src/features/datasets/components/DatasetRunsTable";
import { api } from "@/src/utils/api";
import { useRouter } from "next/router";
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import Link from "next/link";

export default function Dataset() {
  const router = useRouter();
  const projectId = router.query.projectId as string;
  const datasetId = router.query.datasetId as string;

  const dataset = api.datasets.byId.useQuery({
    datasetId,
    projectId,
  });

  return (
    <div>
      <Header
        title={`Dataset: ${dataset.data?.name}`}
        breadcrumb={[
          { name: "Datasets", href: `/project/${projectId}/datasets` },
          { name: dataset.data?.name ?? datasetId },
        ]}
      />
      <Tabs value="runs" className="mb-3">
        <TabsList>
          <TabsTrigger value="runs">Runs</TabsTrigger>
          <TabsTrigger value="items" asChild>
            <Link href={`/project/${projectId}/datasets/${datasetId}/items`}>
              Items
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <DatasetRunsTable projectId={projectId} datasetId={datasetId} />

      <p className="mt-3 text-xs text-gray-600">
        Add new runs via Python or JS/TS SDKs. See{" "}
        <a href="https://langfuse.com/docs/datasets" className="underline">
          documentation
        </a>{" "}
        for details.
      </p>
    </div>
  );
}
