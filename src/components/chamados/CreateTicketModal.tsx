'use client';

import { Modal, Form, Input, Select, App } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { novoChamadoSchema, type NovoChamadoForm } from '@/schemas/chamado';
import { AREAS, PRIORIDADES } from '@/types';
import { useCriarChamado } from '@/hooks/useChamados';

const { TextArea } = Input;

interface NovoChamadoModalProps {
  open: boolean;
  onClose: () => void;
}

export default function NovoChamadoModal({ open, onClose }: NovoChamadoModalProps) {
  const criarMutation = useCriarChamado();
  const { message } = App.useApp();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NovoChamadoForm>({
    resolver: zodResolver(novoChamadoSchema),
    defaultValues: {
      titulo: '',
      descricao: '',
      equipamento: '',
      instalacao: '',
      responsavel: null,
    },
  });

  const onSubmit = async (data: NovoChamadoForm) => {
    try {
      await criarMutation.mutateAsync({
        ...data,
        responsavel: data.responsavel ?? null,
      });
      message.success('Chamado criado com sucesso!');
      reset();
      onClose();
    } catch {
      message.error('Erro ao criar chamado. Tente novamente.');
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      title="Novo Chamado"
      open={open}
      onOk={handleSubmit(onSubmit)}
      onCancel={handleCancel}
      okText="Criar chamado"
      cancelText="Cancelar"
      confirmLoading={criarMutation.isPending}
      width={560}
      destroyOnHidden
    >
      <Form layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item
          label="Título"
          validateStatus={errors.titulo ? 'error' : ''}
          help={errors.titulo?.message}
          required
        >
          <Controller
            name="titulo"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Descreva o problema brevemente" />
            )}
          />
        </Form.Item>

        <div style={{ display: 'flex', gap: 16 }}>
          <Form.Item
            label="Área"
            validateStatus={errors.area ? 'error' : ''}
            help={errors.area?.message}
            required
            style={{ flex: 1 }}
          >
            <Controller
              name="area"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Selecione"
                  options={AREAS.map((a) => ({ label: a, value: a }))}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Prioridade"
            validateStatus={errors.prioridade ? 'error' : ''}
            help={errors.prioridade?.message}
            required
            style={{ flex: 1 }}
          >
            <Controller
              name="prioridade"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Selecione"
                  options={PRIORIDADES.map((p) => ({ label: p, value: p }))}
                />
              )}
            />
          </Form.Item>
        </div>

        <Form.Item
          label="Equipamento"
          validateStatus={errors.equipamento ? 'error' : ''}
          help={errors.equipamento?.message}
          required
        >
          <Controller
            name="equipamento"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Ex: Compressor Bitzer 4TCS-8.2" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Instalação"
          validateStatus={errors.instalacao ? 'error' : ''}
          help={errors.instalacao?.message}
          required
        >
          <Controller
            name="instalacao"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Ex: Loja Centro - SP" />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Descrição"
          validateStatus={errors.descricao ? 'error' : ''}
          help={errors.descricao?.message}
          required
        >
          <Controller
            name="descricao"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                rows={4}
                placeholder="Descreva o problema em detalhes"
                showCount
                maxLength={500}
              />
            )}
          />
        </Form.Item>

        <Form.Item label="Responsável (opcional)">
          <Controller
            name="responsavel"
            control={control}
            render={({ field }) => (
              <Input {...field} value={field.value ?? ''} placeholder="Nome do responsável" />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
