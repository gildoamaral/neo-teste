import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ticketSchema, AREAS, PRIORIDADES, Ticket } from '@/types/ticket';
import { useCreateTicket } from '@/hooks/useTickets';

// Schema parcial para criação (removemos campos automáticos como ID e Datas)
// O .omit não remove validações, apenas chaves.
const createSchema = ticketSchema.omit({ 
  id: true, 
  abertura: true, 
  ultimaAtualizacao: true 
});

type CreateTicketForm = z.infer<typeof createSchema>;
import { z } from 'zod';

interface CreateTicketModalProps {
  visible: boolean;
  onClose: () => void;
}

export const CreateTicketModal: React.FC<CreateTicketModalProps> = ({ visible, onClose }) => {
  const { mutate, isPending } = useCreateTicket();
  
  const { control, handleSubmit, reset, formState: { errors } } = useForm<CreateTicketForm>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      status: 'Aberto',
      prioridade: 'Média',
    }
  });

  // Limpa o formulário quando o modal fecha/abre
  useEffect(() => {
    if (visible) reset();
  }, [visible, reset]);

  const onSubmit = (data: CreateTicketForm) => {
    mutate(data, {
      onSuccess: () => {
        message.success('Chamado criado com sucesso!');
        onClose();
      },
      onError: () => {
        message.error('Erro ao criar chamado.');
      }
    });
  };

  return (
    <Modal
      title="Novo Chamado"
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        
        {/* Título */}
        <Form.Item label="Título" validateStatus={errors.titulo ? 'error' : ''} help={errors.titulo?.message}>
          <Controller
            name="titulo"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Ex: Falha no compressor" />}
          />
        </Form.Item>

        {/* Equipamento */}
        <Form.Item label="Equipamento" validateStatus={errors.equipamento ? 'error' : ''} help={errors.equipamento?.message}>
          <Controller
            name="equipamento"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Ex: Ar Condicionado Central" />}
          />
        </Form.Item>
        
        {/* Localização */}
        <Form.Item label="Local da Instalação" validateStatus={errors.instalacao ? 'error' : ''} help={errors.instalacao?.message}>
          <Controller
            name="instalacao"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Ex: Loja Matriz - SP" />}
          />
        </Form.Item>

        <div style={{ display: 'flex', gap: 16 }}>
          {/* Área */}
          <Form.Item label="Área" style={{ flex: 1 }} validateStatus={errors.area ? 'error' : ''} help={errors.area?.message}>
            <Controller
              name="area"
              control={control}
              render={({ field }) => (
                <Select {...field} placeholder="Selecione">
                  {AREAS.map(area => <Select.Option key={area} value={area}>{area}</Select.Option>)}
                </Select>
              )}
            />
          </Form.Item>

          {/* Prioridade */}
          <Form.Item label="Prioridade" style={{ flex: 1 }} validateStatus={errors.prioridade ? 'error' : ''} help={errors.prioridade?.message}>
            <Controller
              name="prioridade"
              control={control}
              render={({ field }) => (
                <Select {...field} placeholder="Selecione">
                  {PRIORIDADES.map(p => <Select.Option key={p} value={p}>{p}</Select.Option>)}
                </Select>
              )}
            />
          </Form.Item>
        </div>

        {/* Descrição */}
        <Form.Item label="Descrição Detalhada" validateStatus={errors.descricao ? 'error' : ''} help={errors.descricao?.message}>
          <Controller
            name="descricao"
            control={control}
            render={({ field }) => <Input.TextArea {...field} rows={4} />}
          />
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Criar Chamado
          </Button>
        </div>
      </Form>
    </Modal>
  );
};