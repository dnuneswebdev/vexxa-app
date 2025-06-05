import {TableSkeleton} from "@/components/loading";

export default function ProposalsLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div>
        <div className="h-9 w-32 bg-muted animate-pulse rounded mb-2" />
        <div className="h-5 w-80 bg-muted animate-pulse rounded" />
      </div>

      {/* Content skeleton */}
      <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
        <TableSkeleton rows={10} columns={6} />
      </div>
    </div>
  );
}
