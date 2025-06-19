import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Search, Filter } from "lucide-react";

export default function ArchivesPage() {
  const [searchFilter, setSearchFilter] = useState<"date" | "caseId" | "targetAccount">("targetAccount");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();

  // This would be replaced with actual data from your backend
  const archiveData = [
    {
      id: "CASE001",
      targetAccount: "@example1",
      date: "2024-01-15",
      pdfs: ["semantic_analysis.pdf", "threat_analysis.pdf"],
    },
    // Add more mock data as needed
  ];

  return (
    <div className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Analysis Archives</h1>

          {/* Search and Filter Section */}
          <div className="flex gap-4 mb-8">
            <div className="flex-1 flex gap-4">
              <Select
                value={searchFilter}
                onValueChange={(value: "date" | "caseId" | "targetAccount") => setSearchFilter(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="caseId">Case ID</SelectItem>
                  <SelectItem value="targetAccount">Target Account</SelectItem>
                </SelectContent>
              </Select>

              {searchFilter === "date" ? (
                <div className="relative">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border absolute top-full mt-2 bg-white z-10"
                  />
                </div>
              ) : (
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder={`Search by ${searchFilter}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Archives Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case ID</TableHead>
                  <TableHead>Target Account</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Reports</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {archiveData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.targetAccount}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {item.pdfs.map((pdf, index) => (
                          <button
                            key={index}
                            className="flex items-center text-sm text-primary hover:text-primary-dark"
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            {pdf}
                          </button>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}