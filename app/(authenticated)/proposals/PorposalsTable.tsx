"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import { Modal } from "@/components/shared/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Eye, FileText, MoreHorizontal, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PaginationComponent } from "@/components/shared/pagination";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

// Mock data for proposals
type Proposal = {
  id: string;
  client: string;
  phone: string;
  document: string;
  address: string;
  products: string;
  date: string;
  status: "Pendente" | "Cancelado" | "Concluído";
};

const mockProposals: Proposal[] = [
  {
    id: "#IA-01",
    client: "Maria Silva",
    phone: "(11) 98765-4321",
    document: "123.456.789-00",
    address: "Rua das Flores, 123 - São Paulo, SP",
    products: "Janela de Alumínio, Porta de Vidro",
    date: "27/05/2025",
    status: "Pendente",
  },
  {
    id: "#IA-02",
    client: "João Pereira",
    phone: "(11) 91234-5678",
    document: "987.654.321-00",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    products: "Porta de Entrada, Fechadura Digital",
    date: "26/05/2025",
    status: "Concluído",
  },
  {
    id: "#IA-03",
    client: "Ana Costa",
    phone: "(11) 99876-5432",
    document: "456.789.123-00",
    address: "Rua Augusta, 500 - São Paulo, SP",
    products: "Box para Banheiro, Espelho",
    date: "25/05/2025",
    status: "Cancelado",
  },
  {
    id: "#IA-04",
    client: "Carlos Oliveira",
    phone: "(11) 98888-7777",
    document: "789.123.456-00",
    address: "Rua Oscar Freire, 300 - São Paulo, SP",
    products: "Janela Basculante, Vidro Temperado",
    date: "24/05/2025",
    status: "Pendente",
  },
  {
    id: "#IA-05",
    client: "Fernanda Santos",
    phone: "(11) 97777-8888",
    document: "321.654.987-00",
    address: "Alameda Santos, 200 - São Paulo, SP",
    products: "Porta de Correr, Trilho de Alumínio",
    date: "23/05/2025",
    status: "Concluído",
  },
  {
    id: "#IA-06",
    client: "Roberto Almeida",
    phone: "(11) 96666-5555",
    document: "654.987.321-00",
    address: "Rua Consolação, 400 - São Paulo, SP",
    products: "Janela Acústica, Vidro Duplo",
    date: "22/05/2025",
    status: "Pendente",
  },
  {
    id: "#IA-07",
    client: "Luciana Martins",
    phone: "(11) 95555-6666",
    document: "12.345.678/0001-90",
    address: "Av. Brigadeiro Faria Lima, 1500 - São Paulo, SP",
    products: "Fachada de Vidro, Porta Automática",
    date: "21/05/2025",
    status: "Cancelado",
  },
  {
    id: "#IA-08",
    client: "Paulo Mendes",
    phone: "(11) 94444-3333",
    document: "234.567.890-00",
    address: "Rua Haddock Lobo, 250 - São Paulo, SP",
    products: "Guarda-corpo de Vidro, Corrimão",
    date: "20/05/2025",
    status: "Pendente",
  },
  {
    id: "#IA-09",
    client: "Cristina Lima",
    phone: "(11) 93333-4444",
    document: "345.678.901-00",
    address: "Rua da Consolação, 600 - São Paulo, SP",
    products: "Espelho Decorativo, Prateleira de Vidro",
    date: "19/05/2025",
    status: "Concluído",
  },
  {
    id: "#IA-10",
    client: "Marcelo Souza",
    phone: "(11) 92222-1111",
    document: "23.456.789/0001-01",
    address: "Av. Rebouças, 800 - São Paulo, SP",
    products: "Divisória de Vidro, Porta Pivotante",
    date: "18/05/2025",
    status: "Pendente",
  },
  {
    id: "#IA-11",
    client: "Juliana Ferreira",
    phone: "(11) 91111-2222",
    document: "456.789.012-00",
    address: "Rua Pamplona, 150 - São Paulo, SP",
    products: "Box de Vidro, Porta de Alumínio",
    date: "17/05/2025",
    status: "Cancelado",
  },
  {
    id: "#IA-12",
    client: "Ricardo Gomes",
    phone: "(11) 99999-0000",
    document: "567.890.123-00",
    address: "Av. Nove de Julho, 700 - São Paulo, SP",
    products: "Janela Maxim-ar, Persiana Integrada",
    date: "16/05/2025",
    status: "Concluído",
  },
  {
    id: "#IA-13",
    client: "Patrícia Nunes",
    phone: "(11) 98765-1234",
    document: "34.567.890/0001-12",
    address: "Rua Bela Cintra, 350 - São Paulo, SP",
    products: "Porta Pantográfica, Vidro Laminado",
    date: "15/05/2025",
    status: "Pendente",
  },
  {
    id: "#IA-14",
    client: "Eduardo Castro",
    phone: "(11) 91234-9876",
    document: "678.901.234-00",
    address: "Alameda Campinas, 180 - São Paulo, SP",
    products: "Janela Veneziana, Tela Mosquiteira",
    date: "14/05/2025",
    status: "Concluído",
  },
  {
    id: "#IA-15",
    client: "Aline Rodrigues",
    phone: "(11) 99876-1234",
    document: "789.012.345-00",
    address: "Rua Augusta, 900 - São Paulo, SP",
    products: "Espelho Bisotado, Porta de Correr",
    date: "13/05/2025",
    status: "Pendente",
  },
];

export default function ProposalsTable() {
  const [proposals, setProposals] = useState<Proposal[]>(mockProposals);
  const [idFilter, setIdFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] = useState<{
    id: string;
    newStatus: "Pendente" | "Cancelado" | "Concluído";
    previousStatus: "Pendente" | "Cancelado" | "Concluído";
  } | null>(null);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null
  );
  const pageSize = 10; // Maximum 10 rows per page

  // Prepare status change and show confirmation dialog
  const prepareStatusChange = (
    id: string,
    newStatus: "Pendente" | "Cancelado" | "Concluído",
    previousStatus: "Pendente" | "Cancelado" | "Concluído"
  ) => {
    setPendingStatusChange({ id, newStatus, previousStatus });
    setDialogOpen(true);
  };

  // Handle status change after confirmation
  const handleStatusChange = () => {
    if (!pendingStatusChange) return;

    const { id, newStatus } = pendingStatusChange;
    const updatedProposals = proposals.map((proposal) =>
      proposal.id === id ? { ...proposal, status: newStatus } : proposal
    );

    setProposals(updatedProposals);
    applyFilters(updatedProposals, idFilter, statusFilter);
    setPendingStatusChange(null);
    setDialogOpen(false);

    // Show success toast notification
    toast.success("Status alterado com sucesso!");
  };

  // Handle cancel of status change
  const handleCancelStatusChange = () => {
    setPendingStatusChange(null);
  };

  // Handle dialog close
  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      // Reset pending status when dialog closes without confirmation
      setPendingStatusChange(null);
    }
  };

  // Apply filters based on current filter values
  const applyFilters = (data: Proposal[], id: string, status: string) => {
    return data.filter((proposal) => {
      const matchesId = id
        ? proposal.id.toLowerCase().includes(id.toLowerCase())
        : true;
      const matchesStatus = status ? proposal.status === status : true;
      return matchesId && matchesStatus;
    });
  };

  const filteredProposals = applyFilters(proposals, idFilter, statusFilter);

  // Calculate pagination
  const totalItems = filteredProposals.length;

  // Get current page data
  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return filteredProposals.slice(firstPageIndex, lastPageIndex);
  }, [filteredProposals, currentPage, pageSize]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleIdFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIdFilter(value);
    applyFilters(proposals, value, statusFilter);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    applyFilters(proposals, idFilter, value);
  };

  // Clear all filters
  const clearFilters = () => {
    setIdFilter("");
    setStatusFilter("");
    setCurrentPage(1); // Reset to first page when clearing filters
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="w-full sm:w-1/3">
          <label className="text-sm font-medium mb-2 block">
            ID do Orçamento
          </label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por ID..."
              value={idFilter}
              onChange={handleIdFilterChange}
              className="pl-8"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/3">
          <label className="text-sm font-medium mb-2 block">Status</label>
          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pendente">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  Pendente
                </span>
              </SelectItem>
              <SelectItem value="Cancelado">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  Cancelado
                </span>
              </SelectItem>
              <SelectItem value="Concluído">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  Concluído
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-1/3 flex justify-end">
          <Button variant="outline" onClick={clearFilters}>
            Limpar filtros
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>CPF/CNPJ</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((proposal) => (
            <TableRow key={proposal.id}>
              <TableCell className="font-medium">{proposal.id}</TableCell>
              <TableCell>{proposal.client}</TableCell>
              <TableCell>{proposal.phone}</TableCell>
              <TableCell>{proposal.document}</TableCell>
              <TableCell>{proposal.date}</TableCell>
              <TableCell>
                <Select
                  value={proposal.status}
                  onValueChange={(
                    value: "Pendente" | "Cancelado" | "Concluído"
                  ) => {
                    // Only update the status if it's different from the current one
                    if (value !== proposal.status) {
                      prepareStatusChange(proposal.id, value, proposal.status);
                    }
                  }}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendente">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                        Pendente
                      </span>
                    </SelectItem>
                    <SelectItem value="Cancelado">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-red-500"></span>
                        Cancelado
                      </span>
                    </SelectItem>
                    <SelectItem value="Concluído">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        Concluído
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => setSelectedProposal(proposal)}
                    >
                      <Eye className="h-4 w-4" />
                      Detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Orçamento
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationComponent
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />

      {/* Confirmation Dialog for Status Changes */}
      <ConfirmDialog
        open={dialogOpen}
        title="Confirmar alteração de status"
        description={`Tem certeza que deseja alterar o status da proposta ${
          pendingStatusChange?.id || ""
        } para ${pendingStatusChange?.newStatus || ""}?`}
        onOpenChange={handleDialogClose}
        onConfirm={handleStatusChange}
        onCancel={handleCancelStatusChange}
      />

      {/* Proposal Details Modal */}
      <Modal<Proposal>
        isOpen={!!selectedProposal}
        onClose={() => setSelectedProposal(null)}
        title={`Detalhes da Proposta ${selectedProposal?.id || ""}`}
        data={selectedProposal || ({} as Proposal)}
        keyLabels={{
          client: "Cliente",
          phone: "Telefone",
          document: "Documento",
          address: "Endereço",
          products: "Produtos",
          date: "Data",
          status: "Status",
        }}
        keyOrder={
          [
            "client",
            "phone",
            "document",
            "address",
            "products",
            "date",
            "status",
          ] as Array<keyof Proposal>
        }
      />
    </div>
  );
}
