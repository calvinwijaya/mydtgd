document.addEventListener("DOMContentLoaded", function() {
    // URL RSS Feed dari kategori berita web Geodesi UGM
    const rssUrl = 'https://geodesi.ugm.ac.id/category/berita/feed/';
    
    // Menggunakan layanan api.rss2json.com untuk bypass CORS dan mengubah RSS ke JSON
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    // Elemen DOM yang akan diubah
    const newsTitleElement = document.getElementById('news-title');
    const newsLinkElement = document.getElementById('news-link');

    // Fetch data berita
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Gagal mengambil data jaringan');
            }
            return response.json();
        })
        .then(data => {
            // Pastikan status API 'ok' dan ada item berita
            if (data.status === 'ok' && data.items.length > 0) {
                const latestNews = data.items[0]; // Ambil indeks ke-0 (berita paling baru)
                
                // Masukkan judul dan link ke HTML
                newsTitleElement.textContent = latestNews.title + " ";
                newsLinkElement.href = latestNews.link;
            } else {
                throw new Error('Format data tidak sesuai atau kosong');
            }
        })
        .catch(error => {
            console.error('Error fetching latest news:', error);
            // Fallback (Pesan cadangan jika API gagal/website UGM sedang down)
            newsTitleElement.textContent = 'Kunjungi portal berita Departemen ';
            newsLinkElement.href = 'https://geodesi.ugm.ac.id/category/berita/';
        });
});