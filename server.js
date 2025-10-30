const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// 设置视图目录
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// 路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// MNN官网路由
app.get('/m/0.3/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// API路由 - 获取最新动态
app.get('/api/news', (req, res) => {
    const news = [
        {
            id: 1,
            title: "MNN 2.0版本发布 - 性能提升50%",
            date: "2024-10-28",
            summary: "全新架构设计，带来更高效的推理性能",
            link: "#"
        },
        {
            id: 2,
            title: "MNN工作台新增模型压缩功能",
            date: "2024-10-25",
            summary: "一键压缩模型，减少部署体积",
            link: "#"
        },
        {
            id: 3,
            title: "MNN社区突破10000星",
            date: "2024-10-20",
            summary: "感谢社区的支持与贡献",
            link: "#"
        }
    ];
    res.json(news);
});

// API路由 - 获取Demo数据
app.get('/api/demos', (req, res) => {
    const demos = [
        {
            name: "YOLOv3 目标检测",
            description: "实时目标检测算法",
            accuracy: 95.2,
            speed: 15,
            link: "/demos/yolov3"
        },
        {
            name: "Mobilenetv1 图像分类",
            description: "轻量级图像分类模型",
            accuracy: 87.6,
            speed: 8,
            link: "/demos/mobilenet"
        },
        {
            name: "FaceDetection 多输入",
            description: "多输入人脸检测",
            accuracy: 92.1,
            speed: 12,
            link: "/demos/facedetection"
        },
        {
            name: "Deeplab 图像分割",
            description: "语义分割算法",
            accuracy: 89.3,
            speed: 20,
            link: "/demos/deeplab"
        },
        {
            name: "Posenet 姿态检测",
            description: "人体姿态估计",
            accuracy: 91.7,
            speed: 18,
            link: "/demos/posenet"
        }
    ];
    res.json(demos);
});

// API路由 - 提交反馈
app.post('/api/feedback', (req, res) => {
    const { name, email, message } = req.body;
    
    // 这里可以保存到数据库或发送邮件
    console.log('收到反馈:', { name, email, message });
    
    res.json({
        success: true,
        message: '感谢您的反馈！我们会尽快回复您。'
    });
});

// 下载路由
app.get('/download/:platform', (req, res) => {
    const platform = req.params.platform;
    const downloads = {
        'mac': 'MNN工作台 For Mac',
        'windows': 'MNN工作台 For Windows',
        'linux': 'MNN工作台 For Linux'
    };
    
    res.json({
        message: `正在下载 ${downloads[platform] || 'MNN工作台'}`,
        downloadUrl: `/downloads/mnn-workbench-${platform}.zip`
    });
});

// 处理404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`🚀 MNN官网服务器已启动`);
    console.log(`📱 本地访问: http://localhost:${PORT}`);
    console.log(`🌐 网络访问: http://0.0.0.0:${PORT}`);
    console.log(`📂 项目根目录: ${__dirname}`);
});