
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search, Filter } from "lucide-react";

type ArchiveItem = {
  caseId: string;
  targetName: string;
  investigatorName: string;
  timestamp: string;
  pdfUrl: string;
};

const mockArchives: ArchiveItem[] = [
  {
    caseId: "CASE001",
    targetName: "Target A",
    investigatorName: "John Doe",
    timestamp: "2024-01-20T10:30:00",
    pdfUrl: "/reports/case001.pdf"
  },
  // Add more mock data as needed
];

export default function ArchivesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState<Date>();
  const [filters, setFilters] = useState({
    caseId: "",
    investigatorName: "",
  });

  const filteredArchives = mockArchives.filter(item => {
    const matchesSearch = 
      item.targetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.investigatorName.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesDate = !date || item.timestamp.includes(format(date, 'yyyy-MM-dd'));
    
    const matchesFilters = 
      (!filters.caseId || item.caseId.includes(filters.caseId)) &&
      (!filters.investigatorName || item.investigatorName.includes(filters.investigatorName));

    return matchesSearch && matchesDate && matchesFilters;
  });

  return (
    <div className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Archives</h1>
          
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search by target name, case ID, or investigator..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {date ? format(date, 'PPP') : 'Pick date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setDate(undefined);
                setFilters({ caseId: "", investigatorName: "" });
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredArchives.map((item) => (
            <Card key={item.caseId}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Case ID: {item.caseId}</h3>
                    <p className="text-gray-600">Target: {item.targetName}</p>
                    <p className="text-gray-600">Investigator: {item.investigatorName}</p>
                    <p className="text-gray-600">Date: {new Date(item.timestamp).toLocaleDateString()}</p>
                  </div>
                  <Button asChild variant="outline">
                    <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">
                      View Report
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
