import React, { Component } from 'react';
import Title from './Title';

class PostTemplate extends Component {
	render() {
		return (
			<div className="col-md-8 col-md-offset-2 col-xs-12">
			<div className="mainheading">
				<Title />
				<h1 className="posttitle">18 Things You Should Learn Before Moving Into a New Home</h1>
			</div>
			<img className="featured-image img-fluid" src="assets/img/demopic/10.jpg" alt="" />
			<div className="article-post">
				<p>
					Holy grail funding non-disclosure agreement advisor ramen bootstrapping ecosystem. Beta crowdfunding iteration assets business plan paradigm shift stealth mass market seed money rockstar niche market marketing buzz market.
				</p>
				<p>
					Burn rate release facebook termsheet equity technology. Interaction design rockstar network effects handshake creative startup direct mailing. Technology influencer direct mailing deployment return on investment seed round.
				</p>
				<p>
					 Termsheet business model canvas user experience churn rate low hanging fruit backing iteration buyer seed money. Virality release launch party channels validation learning curve paradigm shift hypotheses conversion. Stealth leverage freemium venture startup business-to-business accelerator market.
				</p>
				<blockquote>
					Gen-z strategy long tail churn rate seed money channels user experience incubator startup partner network low hanging fruit direct mailing. Client backing success startup assets responsive web design burn rate A/B testing metrics first mover advantage conversion.
				</blockquote>
				<p>
					Freemium non-disclosure agreement lean startup bootstrapping holy grail ramen MVP iteration accelerator. Strategy market ramen leverage paradigm shift seed round entrepreneur crowdfunding social proof angel investor partner network virality.
				</p>
			</div>
		</div>
		);
	}
}

export default PostTemplate;