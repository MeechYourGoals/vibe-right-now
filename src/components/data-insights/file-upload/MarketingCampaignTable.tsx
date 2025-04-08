
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const MarketingCampaignTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketing Campaign Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Spend</TableHead>
              <TableHead>Return</TableHead>
              <TableHead>ROI</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Weekend Special</TableCell>
              <TableCell>$1,200</TableCell>
              <TableCell>$5,400</TableCell>
              <TableCell className="text-green-500">4.5x</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Happy Hour</TableCell>
              <TableCell>$800</TableCell>
              <TableCell>$2,700</TableCell>
              <TableCell className="text-green-500">3.4x</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Print Ads</TableCell>
              <TableCell>$2,000</TableCell>
              <TableCell>$2,400</TableCell>
              <TableCell className="text-red-500">1.2x</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Social Media</TableCell>
              <TableCell>$1,500</TableCell>
              <TableCell>$5,700</TableCell>
              <TableCell className="text-green-500">3.8x</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MarketingCampaignTable;
