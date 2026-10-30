export default function VideoProfil({ idVideo, judul }) {
  return (
    <div className="aspect-video overflow-hidden rounded-2xl bg-muted">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${idVideo}`}
        title={`Video profil ${judul}`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
