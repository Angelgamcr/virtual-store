import { Loader2Icon } from "lucide-react";
import { Button } from "./button";

export function ButtonLoading() {
  return (
    <Button size="sm" disabled>
      <Loader2Icon className="animate-spin" />
      Cargando...
    </Button>
  )
}