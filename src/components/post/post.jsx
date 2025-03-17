
import "./post.css"

export default function Post({avatar, nome, descricao, imgPet}) {

    return (
        // Conteúdo principal(Posts)
        <div className="container">
            {/* <!-- Post 1 --> */}
            <div className="post">
                <div className="post-header">
                    <img
                        src={avatar}
                        alt="Perfil"
                    />
                    <div className="name">{nome}</div>
                </div>
                <div className="post-content">
                    {descricao}
                </div>
                <img
                    className="post-image"
                    src={imgPet}
                    alt="Imagem do post"
                />
                <div className="post-actions">
                    <button>👍 Curtir</button>
                    <button>💬 Comentar</button>
                    <button>↗️ Compartilhar</button>
                </div>
            </div>

        </div>
    )
}