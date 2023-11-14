import { ReactNode, useEffect, useState } from "react";

function ClientOnly({ children }: { children: ReactNode }) {
  const [renderClientSide, setRenderClientSide] = useState(false);

  useEffect(() => setRenderClientSide(true), []);
  return <>{renderClientSide && children}</>;
}

export default ClientOnly;
