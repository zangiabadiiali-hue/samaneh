import { useState } from 'react';

function App() {
  const [copied, setCopied] = useState(false);

  const handleCopyPath = () => {
    navigator.clipboard.writeText('public/سامانه_پرسنل.bat');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" dir="rtl">
      <div className="glass rounded-2xl p-8 max-w-2xl w-full animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
            <i className="fas fa-users text-white text-3xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">سامانه ثبت نام پرسنل</h1>
          <p className="text-slate-400">نسخه دسکتاپ - قابل اجرا بدون نیاز به سرور</p>
        </div>

        {/* Info */}
        <div className="glass-light rounded-xl p-5 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-info-circle text-blue-400"></i>
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">راهنمای استفاده</h3>
              <p className="text-slate-400 text-sm leading-7">
                برای استفاده از نسخه دسکتاپ، دو فایل زیر را دانلود کرده و در یک پوشه قرار دهید.
                سپس فایل <span className="text-blue-400 font-medium">.bat</span> را اجرا کنید تا سامانه در مرورگر باز شود.
              </p>
            </div>
          </div>
        </div>

        {/* Download Files */}
        <div className="space-y-4 mb-6">
          {/* BAT File */}
          <a
            href="/سامانه_پرسنل.bat"
            download
            className="flex items-center gap-4 p-4 rounded-xl border border-slate-700/50 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <i className="fas fa-terminal text-green-400 text-lg"></i>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium">فایل اجرایی (.bat)</h4>
              <p className="text-slate-400 text-xs mt-1">دابل کلیک کنید تا سامانه باز شود</p>
            </div>
            <div className="text-blue-400 group-hover:translate-x-[-4px] transition-transform">
              <i className="fas fa-download"></i>
            </div>
          </a>

          {/* HTML File */}
          <a
            href="/personnel.html"
            download
            className="flex items-center gap-4 p-4 rounded-xl border border-slate-700/50 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <i className="fas fa-file-code text-blue-400 text-lg"></i>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium">فایل HTML سامانه</h4>
              <p className="text-slate-400 text-xs mt-1">فایل اصلی برنامه - بدون نیاز به اینترنت</p>
            </div>
            <div className="text-blue-400 group-hover:translate-x-[-4px] transition-transform">
              <i className="fas fa-download"></i>
            </div>
          </a>

          {/* Open in Browser */}
          <a
            href="/personnel.html"
            target="_blank"
            className="flex items-center gap-4 p-4 rounded-xl border border-slate-700/50 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <i className="fas fa-external-link-alt text-purple-400 text-lg"></i>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium">اجرا در مرورگر</h4>
              <p className="text-slate-400 text-xs mt-1">نسخه آنلاین را همین الان مشاهده کنید</p>
            </div>
            <div className="text-purple-400 group-hover:translate-x-[-4px] transition-transform">
              <i className="fas fa-arrow-left"></i>
            </div>
          </a>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { icon: 'fa-plus-circle', label: 'ثبت پرسنل', color: 'text-blue-400' },
            { icon: 'fa-search', label: 'جستجو و فیلتر', color: 'text-green-400' },
            { icon: 'fa-edit', label: 'ویرایش اطلاعات', color: 'text-amber-400' },
            { icon: 'fa-database', label: 'ذخیره محلی', color: 'text-purple-400' },
          ].map((f, i) => (
            <div key={i} className="text-center p-3 rounded-lg bg-slate-800/30">
              <i className={`fas ${f.icon} ${f.color} text-lg mb-2`}></i>
              <p className="text-slate-300 text-xs">{f.label}</p>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="glass-light rounded-xl p-5">
          <h3 className="text-white font-medium mb-3 flex items-center gap-2">
            <i className="fas fa-list-ol text-blue-400"></i>
            مراحل نصب
          </h3>
          <ol className="text-slate-400 text-sm space-y-2 list-decimal list-inside">
            <li>هر دو فایل <span className="text-white">.bat</span> و <span className="text-white">.html</span> را دانلود کنید</li>
            <li>آن‌ها را در یک پوشه قرار دهید</li>
            <li>فایل <span className="text-green-400">.bat</span> را دابل کلیک کنید</li>
            <li>سامانه در مرورگر پیش‌فرض باز می‌شود</li>
          </ol>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-xs mt-6">
          ساخته شده با ❤️ | HTML + CSS + JavaScript | بدون نیاز به سرور
        </p>
      </div>
    </div>
  );
}

export default App;
