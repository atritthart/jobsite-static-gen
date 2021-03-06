var techZalando = techZalando || {};

(function () {
    'use strict';

    techZalando.BlogpostCard = React.createClass({
        render: function () {
            var model = this.props.viewModel,
                mediaStyle = { backgroundImage: 'url(' + model.thumbnail + ')' },
                categoryLink = '',
                subTitle = 'by ' + model.authorNames.join(', ') + ' - ' + model.date,
                link = '../blog/' + model.slug;

            if (model.category && model.category_link) {
                categoryLink = <a href={model.category_link} className="category">{model.category}</a>;
            }

            return (
                <div className="card-container">
                    {categoryLink}
                    <a href={link}>
                        <div className="card blog">
                            <div className="media" style={mediaStyle}></div>
                            <div className="content">
                                <div className="content-header">
                                    <p className="title">{model.title}</p>
                                    <p className="subtitle">{subTitle}</p>
                                </div>
                                <div className="text bodycopy">
                                    <p>{model.description}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            );
        }
    });

})();