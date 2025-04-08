
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const FinancialHealthTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Health</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead>Your Venue</TableHead>
              <TableHead>Industry</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Profit Margin</TableCell>
              <TableCell>18.3%</TableCell>
              <TableCell className="text-green-500">16.5%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cost of Goods</TableCell>
              <TableCell>32.1%</TableCell>
              <TableCell className="text-amber-500">28.5%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Labor Cost</TableCell>
              <TableCell>29.8%</TableCell>
              <TableCell className="text-green-500">31.2%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Marketing ROI</TableCell>
              <TableCell>3.4x</TableCell>
              <TableCell className="text-green-500">2.8x</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default FinancialHealthTable;
