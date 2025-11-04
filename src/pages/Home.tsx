// src/pages/Home.tsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  useEffect(() => {
    // إضافة خط Cairo
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Scroll reveal باستخدام IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if ((entry.target as Element).classList.contains("programs-section")) {
              const cards = (entry.target as Element).querySelectorAll(".program-card");
              cards.forEach((card, index) => {
                (card as HTMLElement).style.animation = `fadeInUp 0.6s ease-out ${index * 0.2 + 0.3}s forwards`;
                card.classList.add("visible");
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const toObserve = Array.from(document.querySelectorAll("section, .program-card"));
    toObserve.forEach((el) => observer.observe(el));

    // ربط الروابط الداخلية للتمرير السلس
    const anchors = Array.from(document.querySelectorAll('nav ul li a[href^="#"]'));
    const handleClick = function (this: Element, e: Event) {
      e.preventDefault();
      const href = (this as HTMLAnchorElement).getAttribute("href");
      if (!href) return;
      const target = document.querySelector(href);
      if (target) {
        (target as HTMLElement).scrollIntoView({ behavior: "smooth" });
      }
    };
    anchors.forEach((a) => a.addEventListener("click", handleClick));

    // تنظيف عند التفكيك
    return () => {
      observer.disconnect();
      anchors.forEach((a) => a.removeEventListener("click", handleClick));
      if (link.parentNode) link.parentNode.removeChild(link);
    };
  }, []);

  const styles = `
    :root {
      --primary-blue: #0A3D62;
      --secondary-blue: #2e86de;
      --light-gray: #F4F4F4;
      --white: #FFFFFF;
      --text-color: #333333;
      --header-height: 72px; /* اضبط حسب رغبتك */
    }
    * { margin:0; padding:0; box-sizing:border-box; }
    html,body,#root { height:100%; }
    .site-root { padding-top: var(--header-height); } /* تعويض ارتفاع الهيدر لإزالة الفراغ */
    a { text-decoration:none; color:var(--secondary-blue); transition: color .3s; }
    .container { width:90%; max-width:1200px; margin:0 auto; }
    .btn { display:inline-block; padding:12px 25px; border-radius:5px; font-weight:700; text-align:center; transition: background-color .3s, transform .3s, box-shadow .3s; text-shadow:1px 1px 2px rgba(0,0,0,0.1); }
    .btn-primary { background-color:var(--secondary-blue); color:var(--white); border:2px solid var(--secondary-blue); }
    .btn-primary:hover { background-color:#2471c4; transform:translateY(-3px); box-shadow:0 8px 15px rgba(46,134,222,0.4); }
    .btn-large { padding:12px 35px; font-size:1.1em; margin-top:20px; }
    /* الهيدر الآن ثابت أعلى الصفحة */
    header { background-color:var(--primary-blue); color:var(--white); height:var(--header-height); padding:15px 0; border-bottom:3px solid var(--secondary-blue); animation: fadeInDown 1s ease-out; position:fixed; top:0; left:0; right:0; z-index:1000; display:flex; align-items:center; }
    header .container { display:flex; justify-content:space-between; align-items:center; }
    .logo { font-weight:700; font-size:1.2rem; }
    nav ul { list-style:none; display:flex; gap:20px; align-items:center; }
    nav ul li a { color:var(--white); font-weight:400; position:relative; }
    nav ul li a::after { content:''; position:absolute; bottom:-5px; right:0; width:0; height:2px; background-color:var(--light-gray); transition:width .3s; }
    nav ul li a:hover::after { width:100%; }
    .hero-section { background-color:var(--white); padding:50px 0; text-align:center; }
    .hero-content { max-width:1200px; margin:0 auto; }
    .hero-split { display:flex; flex-direction:row-reverse; align-items:center; text-align:right; gap:30px; margin-bottom:30px; flex-wrap:wrap; }
    .hero-text { flex:1; min-width:280px; padding-left:20px; }
    .hero-image-container { flex:1; max-width:450px; text-align:left; }
    .hero-image { width:100%; height:auto; margin:0; border-radius:10px; box-shadow:0 10px 25px rgba(0,0,0,0.2); border:5px solid var(--secondary-blue); display:block; animation:zoomIn 1s ease-out forwards; }
    .hero-content h1 { font-size:2.2em; color:var(--primary-blue); margin-bottom:10px; }
    .hero-content p { font-size:1em; color:#666; margin-bottom:15px; }
    section { padding:80px 0; opacity:0; transform:translateY(20px); transition: opacity .6s ease-out, transform .6s ease-out; }
    section.visible { opacity:1; transform:translateY(0); }
    h2 { font-size:2em; color:var(--primary-blue); margin-bottom:40px; text-align:center; }
    .gray-bg { background-color:var(--light-gray); }
    .blue-bg { background-color:var(--primary-blue); color:var(--white); }
    .program-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(300px,1fr)); gap:30px; text-align:center; }
    .program-card { background-color:var(--white); padding:30px; border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,.1); border-top:5px solid var(--secondary-blue); transition: transform .4s, box-shadow .4s; opacity:0; transform:translateY(20px); }
    .program-card.visible { opacity:1; transform:translateY(0); }
    .program-card:hover { transform:translateY(-8px) rotate(1deg); box-shadow:0 12px 25px rgba(0,0,0,.2); }
    .contact-content { display:flex; flex-direction:row; gap:40px; align-items:flex-start; flex-wrap:wrap; }
    .contact-details { flex:1; min-width:300px; margin-bottom:30px; text-align:right; }
    .contact-map { flex:1; min-width:300px; height:450px; border-radius:10px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,.3); border:3px solid var(--secondary-blue); }
    footer { background-color:var(--primary-blue); color:var(--white); text-align:center; padding:20px 0; font-size:.9em; border-top:1px solid var(--secondary-blue); }
    @media (max-width:768px) { .hero-split{ flex-direction:column; text-align:center } .hero-text{ min-width:100%; padding-left:0 } .hero-image-container{ max-width:90%; order:-1; text-align:center; margin-bottom:20px } .contact-content{ flex-direction:column } .contact-details, .contact-map{ min-width:100%; text-align:center } }
  `;

  return (
    <div dir="rtl" className="site-root">
      <style>{styles}</style>

      <header>
        <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <div className="logo">مدرسة النبي اليتيم</div>
          <nav>
            <ul>
              <li><a href="#about">رسالتنا</a></li>
              <li><a href="#programs">برامجنا</a></li>
              {/* استبدلنا الرابط الخارجي برابط داخلي للتسجيل */}
              <li><Link to="/login" className="btn" style={{color:'#fff', border:'none'}}>التسجيل</Link></li>
              <li><a href="#contact">اتصل بنا</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-split">
            <div className="hero-image-container">
              <img
                src="https://image.pollinations.ai/prompt/a%2014-year-old%20boy%20student%20holding%20books%20and%20wearing%20glasses%20in%20a%20school%20library?width=1024&height=1024&seed=225"
                alt="طالب بعمر 14 سنة يحمل كتباً ويرتدي نظارة"
                className="hero-image"
              />
            </div>

            <div className="hero-text">
              <h1>مدرسة النبي اليتيم: حيث نبني <strong>قادة المستقبل</strong> برعاية ودفء.</h1>
              <p>انطلاقاً من شعارنا "مرضاة ربنا، صحبة نبينا، خدمة وطننا"، نكفل تربوياً واجتماعياً لنرسم البسمة ونغرس الطمأنينة في نفوس أبنائنا.</p>
              <Link to="/login" className="btn btn-primary btn-large">انضم لنا</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mission-section gray-bg">
        <div className="container">
          <h2>🎯 أكثر من 16 عامًا من العطاء: رسالة المدرسة والجمعية</h2>
          <p>تأسست جمعية كافل اليتيم الولائية تيارت وهدفنا الأسمى هو <strong>رعاية أبنائنا وبناتنا من الأيتام وكفالتهم تربوياً واجتماعياً</strong> قصد رسم البسمة وإدخال السعادة والطمأنينة بنفوسهم.</p>
          <p className="slogan">شعارنا: "مرضاة ربنا، صحبة نبينا، خدمة وطننا"</p>
        </div>
      </section>

      <section id="programs" className="programs-section">
        <div className="container">
          <h2>✨ برامجنا التخصصية: بناء الشخصية والتفوق العلمي</h2>
          <div className="program-grid">
            <div className="program-card">
              <h3>النشاط التربوي</h3>
              <p>توفير البيئة التعليمية الممتازة والتوجيه الأكاديمي، لضمان نشأة سليمة ومستقبل مشرق.</p>
            </div>
            <div className="program-card">
              <h3>النشاط الاجتماعي</h3>
              <p>برامج لتطوير العلاقات الاجتماعية واكتساب الخبرات التي تساهم في بناء شخصيتهم وتحقيق ذواتهم.</p>
            </div>
            <div className="program-card">
              <h3>النشاط العلمي</h3>
              <p>اكتشاف قدرات وميولات أبنائنا العلمية وتنميتها وتوجيهها لخدمة المجتمع والفرد بأفضل شكل.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section blue-bg">
        <div className="container">
          <h2>📞 للتواصل والدعم</h2>

          <div className="contact-content">
            <div className="contact-details">
              <p><strong>العنوان:</strong> مدرسة النبي اليتيم " جمعية كافل اليتيم الولائية تيارت - 88WM+PVX، طريق غير مسمى، تيارت</p>
              <p><strong>البريد الإلكتروني:</strong> <a href="mailto:kafilyatim-t@hotmail.com">kafilyatim-t@hotmail.com</a></p>
              <p><strong>الهاتف:</strong> 0771594343</p>
              <a href="https://www.google.com/maps/dir/Current+Location/مدرسة+النبي+اليتيم+جمعية+كافل+اليتيم+الولائية+تيارت+88WM%2BPVX+Unnamed+Road+Tiaret" target="_blank" rel="noreferrer" className="btn btn-primary btn-large">اذهب إلى المدرسة</a>
            </div>

            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps?q=88WM%2BPVX%20%D9%85%D8%AF%D8%B1%D8%B3%D8%A9%20%D8%A7%D9%84%D9%86%D8%A8%D9%8A%20%D8%A7%D9%84%D9%8A%D8%AA%D9%8A%D9%85%20%22%20%D8%AC%D9%85%D8%B9%D9%8A%D8%A9%20%D9%83%D8%A7%D9%81%D9%84%20%D8%A7%D9%84%D9%8A%D8%AA%D9%8A%D9%85%20%D8%A7%D9%84%D9%88%D9%84%D8%A7%D8%A6%D9%8A%D8%A9%20%D8%AA%D9%8A%D8%A7%D8%B1%D8%AA,&output=embed"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>© 2025 مدرسة النبي اليتيم. كافة الحقوق محفوظة. <a href="#" target="_blank" rel="noreferrer">رابط الجمعية</a></p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
