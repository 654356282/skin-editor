import React, { FC, useState } from 'react';
import styles from './Editor.module.scss';
import { Layout, InputNumber } from 'antd';
import { px } from '@/utils/view';
import Square from '@/components/Square';

const { Header, Sider, Content } = Layout;

export interface EditorProps {}

const Editor: FC<EditorProps> = () => {
  const [paperSize, setPaperSize] = useState({ width: 375, height: 825 });

  function handleChangeSize(size: { width: number; height: number }) {
    setPaperSize(size);
  }

  function handleClick(e: React.MouseEvent) {}

  return (
    <Layout className={styles.layout}>
      <Header>Header</Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content className={styles.content}>
          <Layout>
            <Header className={styles.size}>
              <span>尺寸:</span>
              <span>宽:</span>
              <InputNumber
                type="number"
                value={paperSize.width}
                onBlur={e =>
                  handleChangeSize({
                    width: Number(e.target.value),
                    height: paperSize.height,
                  })
                }
              />
              <span>高:</span>
              <InputNumber
                type="number"
                value={paperSize.height}
                onBlur={e =>
                  handleChangeSize({
                    width: paperSize.width,
                    height: Number(e.target.value),
                  })
                }
              />
            </Header>
            <Content
              className={styles.paper}
              style={{
                width: px(paperSize.width),
                height: px(paperSize.height),
              }}>
              <div id="app">
                <Square
                  canvasHeight={paperSize.height}
                  canvasWidth={paperSize.width}
                />
              </div>
            </Content>
          </Layout>
          <Layout>
            <Header className={styles.size}>工具栏</Header>
            <Content className={styles.toolBar}>
              <ul className={styles.toolList}>
                <li onClick={handleClick}></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Editor;
