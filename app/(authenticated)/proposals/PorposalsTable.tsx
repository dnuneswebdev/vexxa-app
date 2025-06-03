/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useMemo, useEffect } from "react";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type Budget = {
  id?: string;
  budget_id: string;
  name: string;
  phone: string;
  cpf_cnpj: string;
  address: string;
  products: string;
  date: string;
  status: string;
  created_at?: string;
};

interface ProposalsTableProps {
  initialBudgets: Budget[];
  totalBudgets: number;
}

export default function ProposalsTable({
  initialBudgets,
  totalBudgets,
}: ProposalsTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [pendingStatusChange, setPendingStatusChange] = useState<{
    id: string;
    budget_id: string;
    newStatus: string;
    previousStatus: string;
  } | null>(null);
  const pageSize = 10;
  const idFilter = searchParams.get("budget_id") || "";
  const statusFilter = searchParams.get("budget_status") || "";

  useEffect(() => {
    setBudgets(initialBudgets);
  }, [initialBudgets]);

  const handleFilterChange = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const prepareStatusChange = (
    id: string,
    budget_id: string,
    newStatus: string,
    previousStatus: string
  ) => {
    setPendingStatusChange({ id, budget_id, newStatus, previousStatus });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setPendingStatusChange(null);
  };

  const handleStatusChange = async () => {
    if (pendingStatusChange) {
      toast.success("Status alterado com sucesso");
      handleDialogClose();
    }
  };

  const handleCancelStatusChange = () => {
    handleDialogClose();
  };

  const viewBudgetDetails = (budget: Budget) => {
    const filteredBudgets = {
      budget_id: `#${budget.budget_id}`,
      name: budget.name,
      phone: budget.phone,
      cpf_cnpj: budget.cpf_cnpj,
      address: budget.address,
      products: budget.products,
      date: budget.date,
      status: budget.status.toUpperCase(),
    };

    setSelectedBudget(filteredBudgets);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push(pathname);
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
              onChange={(e) => handleFilterChange("budget_id", e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/3">
          <label className="text-sm font-medium mb-2 block">Status</label>
          <Select
            value={statusFilter}
            onValueChange={(value) =>
              handleFilterChange("budget_status", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pendente">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  Pendente
                </span>
              </SelectItem>
              <SelectItem value="cancelado">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  Cancelado
                </span>
              </SelectItem>
              <SelectItem value="concluido">
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
          {budgets.map((budget) => (
            <TableRow key={budget.id}>
              <TableCell className="font-medium">#{budget.budget_id}</TableCell>
              <TableCell>{budget.name}</TableCell>
              <TableCell>{budget.phone}</TableCell>
              <TableCell>{budget.cpf_cnpj}</TableCell>
              <TableCell>{budget.date}</TableCell>
              <TableCell>
                <Select
                  value={budget.status}
                  onValueChange={(
                    value: "Pendente" | "Cancelado" | "Concluído"
                  ) => {
                    if (value !== budget.status) {
                      prepareStatusChange(
                        budget.id as string,
                        budget.budget_id,
                        value,
                        budget.status
                      );
                    }
                  }}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendente">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                        Pendente
                      </span>
                    </SelectItem>
                    <SelectItem value="cancelado">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-red-500"></span>
                        Cancelado
                      </span>
                    </SelectItem>
                    <SelectItem value="concluido">
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
                      onClick={() => viewBudgetDetails(budget)}
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
        currentPage={Number(searchParams.get("page")) || 1}
        totalItems={totalBudgets}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />

      <ConfirmDialog
        open={dialogOpen}
        title="Confirmar alteração de status"
        description={`Tem certeza que deseja alterar o status do orçamento #${
          pendingStatusChange?.budget_id || ""
        } para ${pendingStatusChange?.newStatus.toUpperCase() || ""}?`}
        onOpenChange={handleDialogClose}
        onConfirm={handleStatusChange}
        onCancel={handleCancelStatusChange}
      />

      <Modal<Budget>
        isOpen={!!selectedBudget}
        onClose={() => setSelectedBudget(null)}
        title={`Detalhes do Orçamento ${selectedBudget?.budget_id || ""}`}
        data={selectedBudget || ({} as Budget)}
        keyLabels={{
          budget_id: "ID",
          name: "Cliente",
          phone: "Telefone",
          cpf_cnpj: "CPF/CNPJ",
          address: "Endereço",
          products: "Produtos",
          date: "Data",
          status: "Status",
        }}
        keyOrder={
          [
            "budget_id",
            "name",
            "phone",
            "cpf_cnpj",
            "address",
            "products",
            "date",
            "status",
          ] as Array<keyof Budget>
        }
      />
    </div>
  );
}
