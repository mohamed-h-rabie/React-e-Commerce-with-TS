import { memo } from "react";

export default memo(function Heading({ title }: { title: string }) {
  return (
    <h2 className="mb-3" style={{ fontSize: "26px" }}>
      {title}
    </h2>
  );
});
