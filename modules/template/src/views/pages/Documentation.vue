<template>
    <div class="card">
        <div class="font-semibold text-2xl mb-4">Tài liệu hướng dẫn cài đặt</div>
        <div class="font-semibold text-xl mb-4">Get Started</div>
        <p class="text-lg mb-4">
            1. Clone - sao chép thư mục template => đặt tên cho dự án mới và đặt trong  /modules/project_name
        </p>
        <p class="text-lg mb-4">
            2. Chạy câu lệnh sau, để cài đặt các thư viện cho dự án
        </p>
        <pre class="app-code"><code>npm install</code></pre>

        <p class="text-lg mb-4">
            3. Bạn có thể run demo với câu lệnh:
        </p>

        <pre class="app-code"><code>npm run serve:single-spa</code></pre>

        <p class="text-lg mb-4">4. Tài liệu tham khảo, giao diện của ứng dụng được xây dựng dựa trên </p>
        <ul class="leading-normal list-disc pl-8 text-lg mb-4">
            <li><span class="text-primary font-medium">https://primevue.org/</span>: các components được sử dụng lấy tại đây.</li>
            <li><span class="text-primary font-medium">https://sakai.primevue.org/documentation</span>: Demo UI mẫu.</li>

        </ul>

    </div>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 991px) {
    .video-container {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;

        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
}
</style>
