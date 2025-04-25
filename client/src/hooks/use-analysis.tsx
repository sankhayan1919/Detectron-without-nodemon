import { createContext, ReactNode, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type AnalysisData = {
  accountName: string;
  password: string;
  targetAccount: string;
  contentType: string;
  content: string;
};

type AnalysisResponse = {
  semanticAnalysis: string;
  threatAnalysis: string;
};

type AnalysisContextType = {
  analysisMutation: ReturnType<typeof useMutation<AnalysisResponse, Error, AnalysisData>>;
  semanticAnalysis: string | null;
  threatAnalysis: string | null;
};

const AnalysisContext = createContext<AnalysisContextType | null>(null);

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [semanticAnalysis, setSemanticAnalysis] = useState<string | null>(null);
  const [threatAnalysis, setThreatAnalysis] = useState<string | null>(null);

  const analysisMutation = useMutation({
    mutationFn: async (data: AnalysisData) => {
      const res = await apiRequest("POST", "/api/analyze", data);
      return await res.json();
    },
    onSuccess: (data: AnalysisResponse) => {
      setSemanticAnalysis(data.semanticAnalysis);
      setThreatAnalysis(data.threatAnalysis);
      toast({
        title: "Analysis Complete",
        description: "The analysis has been successfully completed.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AnalysisContext.Provider
      value={{
        analysisMutation,
        semanticAnalysis,
        threatAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  
  if (!context) {
    // If the context is not available, create a standalone hook implementation
    const { toast } = useToast();
    const [semanticAnalysis, setSemanticAnalysis] = useState<string | null>(null);
    const [threatAnalysis, setThreatAnalysis] = useState<string | null>(null);

    const analysisMutation = useMutation({
      mutationFn: async (data: AnalysisData) => {
        const res = await apiRequest("POST", "/api/analyze", data);
        return await res.json();
      },
      onSuccess: (data: AnalysisResponse) => {
        setSemanticAnalysis(data.semanticAnalysis);
        setThreatAnalysis(data.threatAnalysis);
        toast({
          title: "Analysis Complete",
          description: "The analysis has been successfully completed.",
        });
      },
      onError: (error: Error) => {
        toast({
          title: "Analysis Failed",
          description: error.message,
          variant: "destructive",
        });
      },
    });

    return {
      analysisMutation,
      semanticAnalysis,
      threatAnalysis,
    };
  }
  
  return context;
}
