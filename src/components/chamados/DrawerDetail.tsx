'use client';

import { Drawer, Timeline, Typography, Skeleton, Space } from 'antd';
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { StatusBadge, PriorityTag } from '@/components/ui';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import type { DrawerDetailProps } from '@/types';

const { Text, Paragraph } = Typography;

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const DetailItem = ({ icon, label, value }: DetailItemProps) => (
  <div style={{ display: 'flex', alignItems: 'start', gap: 10 }}>
    <div style={{ color: 'var(--text-foreground)', marginTop: 2 }}>
      {icon}
    </div>
    <div>
      <p style={{
        fontSize: 11,
        color: 'var(--text-foreground)',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        margin: 0,
        marginBottom: 4
      }}>
        {label}
      </p>
      <p style={{
        fontSize: 14,
        fontWeight: 500,
        margin: 0
      }}>
        {value}
      </p>
    </div>
  </div>
);

export function DrawerDetail({ chamado, open, onClose, loading }: DrawerDetailProps) {
  const { isMobile } = useBreakpoint();

  return (
    <Drawer
      title={
        chamado ? (
          <div>
            <p style={{
              fontSize: 12,
              fontWeight: 500,
              margin: 0,
              marginBottom: 4,
              fontFamily: 'var(--font-primary)',
              color: 'var(--text-foreground)'
            }}>
              #{chamado.id}
            </p>
            <h2 style={{
              fontSize: isMobile ? 16 : 18,
              fontWeight: 600,
              margin: 0
            }}>
              {chamado.titulo}
            </h2>
          </div>
        ) : 'Detalhes do chamado'
      }
      open={open}
      onClose={onClose}
      size={isMobile ? '100%' : 520}
      styles={{ body: { paddingTop: 20, padding: isMobile ? 16 : 24 } }}
    >
      {loading ? (
        <Skeleton active paragraph={{ rows: 10 }} />
      ) : chamado ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          <Space size={8}>
            <StatusBadge status={chamado.status} />
            <PriorityTag prioridade={chamado.prioridade} />
          </Space>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 12 : 16,
          }}>
            <DetailItem
              icon={<EnvironmentOutlined style={{ fontSize: 16 }} />}
              label="Área"
              value={chamado.area}
            />
            <DetailItem
              icon={<ToolOutlined style={{ fontSize: 16 }} />}
              label="Equipamento"
              value={chamado.equipamento}
            />
            <DetailItem
              icon={<UserOutlined style={{ fontSize: 16 }} />}
              label="Responsável"
              value={chamado.responsavel ?? 'Não atribuído'}
            />
            <DetailItem
              icon={<ClockCircleOutlined style={{ fontSize: 16 }} />}
              label="Abertura"
              value={dayjs(chamado.abertura).format('DD/MM/YYYY HH:mm')}
            />
            <DetailItem
              icon={<EnvironmentOutlined style={{ fontSize: 16 }} />}
              label="Instalação"
              value={chamado.instalacao}
            />
            <DetailItem
              icon={<ClockCircleOutlined style={{ fontSize: 16 }} />}
              label="Última Atualização"
              value={dayjs(chamado.ultimaAtualizacao).format('DD/MM/YYYY HH:mm')}
            />
          </div>

          {/* Description */}
          <div>
            <h3 style={{
              fontSize: 14,
              fontWeight: 600,
              margin: 0,
              marginBottom: 8
            }}>
              Descrição
            </h3>
            <Paragraph style={{
              fontSize: 14,
              color: 'var(--text-foreground)',
              lineHeight: 1.6,
              margin: 0
            }}>
              {chamado.descricao}
            </Paragraph>
          </div>

          {/* Timeline */}
          <div>
            <h3 style={{
              fontSize: 14,
              fontWeight: 600,
              margin: 0,
              marginBottom: 16
            }}>
              Timeline de Eventos
            </h3>
            <Timeline
              items={[...chamado.timeline].reverse().map((item, index) => ({
                icon: index === 0 ? (
                  <div style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-color)',
                    border: '2px solid var(--primary-color)'
                  }} />
                ) : undefined,
                content: (
                  <div style={{ paddingBottom: 8 }}>
                    <p style={{
                      fontSize: 11,
                      color: 'var(--text-foreground)',
                      fontWeight: 500,
                      margin: 0,
                      marginBottom: 4
                    }}>
                      {dayjs(item.data).format('YYYY-MM-DD HH:mm')}
                    </p>
                    <p style={{
                      fontSize: 14,
                      margin: 0,
                      marginBottom: 4
                    }}>
                      {item.descricao}
                    </p>
                    <p style={{
                      fontSize: 12,
                      color: 'var(--text-foreground)',
                      margin: 0
                    }}>
                      {item.usuario}
                    </p>
                  </div>
                ),
              }))}
            />
          </div>
        </div>
      ) : (
        <Text type="secondary">Nenhum chamado selecionado.</Text>
      )}
    </Drawer>
  );
}
