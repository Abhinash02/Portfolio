import ItemTable from "@/components/admin/ItemTable";
import { getPortfolioData } from "@/lib/getData";

export default async function SocialsAdminPage() {
  const data = await getPortfolioData();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Social Links</h1>
      <ItemTable
        items={data.socials}
        columns={[
          { key: "platform", label: "Platform" },
          { key: "url", label: "URL" }
        ]}
        endpoint="/api/socials"
      />
    </div>
  );
}