import { geoDocument } from "@/lib/site";

export function GET() {
  return Response.json(geoDocument(), {
    headers: { "cache-control": "public, max-age=3600", "access-control-allow-origin": "*" },
  });
}
