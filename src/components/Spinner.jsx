import { Spinner } from "@material-tailwind/react";

export function SpinnerSizes() {
    return (
      <div className="flex items-end gap-8">
        <Spinner className="h-12 w-12" />
        Loading...
      </div>
    );
  }