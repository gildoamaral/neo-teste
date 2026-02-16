import { Space } from 'antd'

const Logo = () => {
  return (
    <Space align="center" size={12}>
      <div style={{
        width: 40,
        height: 40,
        background: '#ec6725',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff'
      }}>
        N
      </div>
      <span style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>NEO</span>
    </Space>
  )
}

export default Logo