'use client';

import { Drawer, Descriptions, Timeline, Typography, Tag, Divider, Skeleton, type GetProps } from 'antd';
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import {StatusBadge} from './StatusBadge';
import {PriorityTag} from './PriorityTag';
import type { ChamadoComTimeline } from '@/types';

const { Text, Paragraph } = Typography;
type DividerProps = GetProps<typeof Divider>;

interface DrawerDetailProps {
  chamado: ChamadoComTimeline | null | undefined;
  open: boolean;
  onClose: () => void;
  loading?: boolean;
}

export function DrawerDetail({ chamado, open, onClose, loading }: DrawerDetailProps) {
  return (
    <Drawer
      title={chamado ? `Chamado #${chamado.id}` : 'Detalhes do chamado'}
      open={open}
      onClose={onClose}
      size={520}
      styles={{ body: { paddingTop: 16 } }}
    >
      {loading ? (
        <Skeleton active paragraph={{ rows: 10 }} />
      ) : chamado ? (
        <>
          <Typography.Title level={5} style={{ marginTop: 0 }}>
            {chamado.titulo}
          </Typography.Title>

          <Descriptions column={1} size="small" bordered>
            <Descriptions.Item label="Status">
              <StatusBadge status={chamado.status} />
            </Descriptions.Item>
            <Descriptions.Item label="Prioridade">
              <PriorityTag prioridade={chamado.prioridade} />
            </Descriptions.Item>
            <Descriptions.Item label="Área">
              <Tag>{chamado.area}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Equipamento">
              <Text>
                <ToolOutlined style={{ marginRight: 6 }} />
                {chamado.equipamento}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Instalação">
              <Text>
                <EnvironmentOutlined style={{ marginRight: 6 }} />
                {chamado.instalacao}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Responsável">
              <Text>
                <UserOutlined style={{ marginRight: 6 }} />
                {chamado.responsavel ?? 'Não atribuído'}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Abertura">
              <Text>
                <ClockCircleOutlined style={{ marginRight: 6 }} />
                {dayjs(chamado.abertura).format('DD/MM/YYYY HH:mm')}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Última atualização">
              <Text>
                {dayjs(chamado.ultimaAtualizacao).format('DD/MM/YYYY HH:mm')}
              </Text>
            </Descriptions.Item>
          </Descriptions>

          <Divider titlePlacement={'left' as DividerProps['titlePlacement']}>Descrição</Divider>
          <Paragraph>{chamado.descricao}</Paragraph>

          <Divider titlePlacement={'left' as DividerProps['titlePlacement']}>Timeline</Divider>
          <Timeline
            items={chamado.timeline.map((item) => ({
              content: (
                <div>
                  <Text strong>{item.usuario}</Text>
                  <br />
                  <Text>{item.descricao}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {dayjs(item.data).format('DD/MM/YYYY HH:mm')}
                  </Text>
                </div>
              ),
            }))}
          />
        </>
      ) : (
        <Text type="secondary">Nenhum chamado selecionado.</Text>
      )}
    </Drawer>
  );
}
