<template>
  <div>
    <div v-for="(slice, index) in slices" :key="'slice-' + index">
      <template v-if="slice.slice_type === 'feature_person'">
        <section
          class="blk-featperson__wrapper section-wrapper"
          :style="{ backgroundColor: slice.primary.featured_person_color }"
        >
          <div class="inview-wrapper blk-featperson">
            <div class="inview-content inview-full bottom">
              <div class="container">
                <div class="row blk-featperson__title">
                  <div class="col-sm-12">
                    <h1>
                      <span
                        class="author"
                      >{{ $prismic.richTextAsPlain(slice.primary.featured_person_author) }}</span>
                      <span
                        class="title"
                      >{{ $prismic.richTextAsPlain(slice.primary.featured_person_title) }}</span>
                    </h1>
                  </div>
                </div>
                <div class="row blk-featperson__seperator">
                  <div class="col-sm-12">
                    <a href="#" class="btn--scroll-down js-scrolltosection">
                      scroll
                      <i class="icon-arrow-down"></i>
                    </a>
                    <div class="seperator"></div>
                  </div>
                </div>
                <div class="row blk-featperson__text blk-article__text" id="intro">
                  <div class="col-sm-12">
                    <prismic-rich-text :field="slice.primary.featured_person_description"/>
                    <!-- <p>
                                <span class="letter">D</span>epuis 2008, Wendy Ambroise (alias Jahfazon) et son groupe Israëlite mènent leur barque musicale en surfant sur le courant reggae roots. Trois albums plus tard, le rastaman épouse le style de Kaya en s’essayant au seggae.
                                </p>
                                <p>
                                roots. Trois albums plus tard, le rastaman épouse le style de Kaya en s’essayant au seggae.
                                “Jusqu’ici, nous avons joué du reggae. Nous voulions franchir un cap en proposant un album faisant honneur à la musique de Kaya”, confie Wendy Ambroise. Il souligne que le groupe a acquis suffisamment d’expérience pour s’attaquer à un style qui n’est pas le sien et qu’il a dû apprivoiser. “Depuis 2008, nous nous sommes concentrés sur le reggae roots. Nous avons voulu montrer que nous avons fait du chemin et avons choisi de faire apprécier l’évolution de notre musique.”
                    </p>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="blk-featperson__image">
            <prismic-image :field="slice.primary.featured_person_image"/>
          </div>
        </section>
      </template>
      <template v-else-if="slice.slice_type === 'timeline'">
        <section class="blk-featpost__wrapper section-wrapper">
          <div class="inview-wrapper blk-featpost">
            <div class="blk-featpost__cover">
              <prismic-image :field="slice.primary.timeline_featured_image"/>
            </div>
            <div class="inview-content inview-full">
              <div class="container">
                <div class="row bottom blk-featpost__cover__title">
                  <div class="col-sm-12">
                    <h2>
                      <span
                        class="title"
                      >{{ $prismic.richTextAsPlain(slice.primary.timeline_title) }}</span>
                    </h2>
                  </div>
                </div>
                <div class="row blk-featpost__seperator">
                  <div class="col-sm-12">
                    <div class="seperator"></div>
                  </div>
                </div>

                <div class="row blk-article__text" id="intro">
                  <div class="col-sm-12">
                    <p>
                      <prismic-rich-text :field="slice.primary.timeline_description"/>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="blk-timeline__wrapper section-wrapper">
          <div class="inview-wrapper blk-timeline">
            <div class="inview-content inview-full">
              <div class="container">
                <div class="row">
                  <div class="col-lg-7 col-sm-12">
                    <div class="blk-timeline__listing">
                      <!-- 2 ul. 1 details. 1 menu -->
                      <ul class="blk-timeline__media__listing js-timeline-media-listing">
                        <li
                          v-for="(timeline_item, index) in timeline_items"
                          :key="'timeline_item-' + index"
                          :class="index==0 ? 'js-timeline-media-listing-item active' : 'js-timeline-media-listing-item'"
                          :data-item="index"
                        >
                          <div class="blk-timeline__media">
                            <prismic-rich-text :field="timeline_item.data.description"/>
                            <prismic-link :field="timeline_item.data.youtube_video_link">Click here</prismic-link>
                          </div>
                          <ul class="blk-timeline__users">
                            <li
                              v-for="(people, index) in timeline_item.data.people"
                              :key="'reference-item-' + index"
                            >
                              <prismic-image :field="people.image"/>
                              <prismic-rich-text :field="people.name"/>
                              <span
                                class="blk-timeline__users__department"
                              >{{ $prismic.richTextAsPlain(people.department) }}</span>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <ul class="blk-timeline__media__menu js-timeline-media-menu">
                        <li
                          v-for="(timeline_item, index) in timeline_items"
                          :key="'timeline_item-' + index"
                          :class="index==0 ? 'js-timeline-media-menu-item active' : 'js-timeline-media-menu-item'"
                          :data-item="index"
                        >
                          <prismic-rich-text :field="timeline_item.data.title"/>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-5 col-sm-12">
                    <div class="blk-timeline__listing">
                      <!-- 1 ul. Quotes with appropirate bg as data attributes in javascript on change set the bg to the parent section -->
                      <ul class="blk-timeline__quote__listing js-timeline-quote-slider">
                        <li
                          v-for="(timeline_item, index) in timeline_items"
                          :key="'timeline_item-' + index"
                          class="blk-timeline__quote__item js-timeline-quote-slider--item"
                          :data-quote="timeline_item.data.featured_background.url"
                        >
                          <div class="blk-timeline__quote__text">
                            <prismic-rich-text :field="timeline_item.data.quote"/>
                          </div>

                          <span
                            class="blk-timeline__quote__author"
                          >{{ $prismic.richTextAsPlain(timeline_item.data.author) }}</span>
                          <!-- <prismic-image :field="timeline_item.data.featured_background"/> -->
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="blk-timeline__quote__bg js-timeline-quote-slider--bg"></div>
        </section>
      </template>
      <template v-else-if="slice.slice_type === 'featured_post'">
        <section class="blk-featpost__wrapper section-wrapper">
          <div class="inview-wrapper blk-featpost">
            <div class="blk-featpost__cover">
              <prismic-image :field="slice.primary.featured_post_image"/>
            </div>
            <div class="inview-content inview-full">
              <div class="container">
                <div class="row bottom blk-featpost__cover__title">
                  <div class="col-sm-12">
                    <h2>
                      <span
                        class="title"
                      >{{ $prismic.richTextAsPlain(slice.primary.featured_post_title) }}</span>
                      <!-- <span class="small">The</span>
                            <br>
                      <span class="title">Feldgling Army</span>-->
                    </h2>
                  </div>
                </div>
                <div class="row blk-featpost__seperator">
                  <div class="col-sm-12">
                    <div class="seperator"></div>
                  </div>
                </div>

                <div class="row blk-article__text" id="intro">
                  <div class="col-sm-12">
                    <prismic-rich-text :field="slice.primary.featured_post_description"/>
                    <!-- <p>
                        <span class="letter">Y</span>
                        <span class="small">
                            <i>eah, it's 8:00. Doc. Oh, pleased to meet you, Calvin Marty Klein. Do you mind if I sit here? Hey, not too early I sleep in on Saturday. Oh, McFly, your shoe's untied. Don't be so gullible, McFly. You got the place fixed up nice, McFly. I have you're car towed all the way to your house and all you've got for me is light beer. What are you looking at, butthead. Say hi to your mom for me. C'mon, open up, let me out of here, Yo.</i>
                        </span>
                        </p>
                        <p>Hey wait, wait a minute, who are you? Stella, another one of these damn kids jumped in front of my car. Come on out here, help me take him in the house. No sir, I'm gonna make something out of myself, I'm going to night school and one day I'm gonna be somebody. Right, gimme a Pepsi free. No, Marty, we've already agreed that having information about the future could be extremely dangerous. Even if your intentions are good, they could backfire drastically. Whatever you've got to tell me I'll find out through the natural course of time. How could I have been so careless. One point twenty-one gigawatts. Tom, how am I gonna generate that kind of power, it can't be done, it can't.</p>
                    <p>I, I don't know. Which one's your pop? Watch it, Goldie. Thanks. Right.</p>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </template>
    </div>

    <!-- <section class="blk-featpost__wrapper section-wrapper"> 
            <div class="inview-wrapper blk-featpost">
            <div class="blk-featpost__cover">
                <img src="img/article/noimage-article.png" class="img-responsive" alt="no image">
            </div>
            <div class="inview-content inview-full">
                <div class="container">
                <div class="row bottom blk-featpost__cover__title">
                    <div class="col-sm-12">
                    <h2><span class="title">Beginnings</span></h2>
                    </div>
                </div>
                <div class="row blk-featpost__seperator">
                    <div class="col-sm-12">
                    <div class="seperator"></div>
                    </div>
                </div>
                
                <div class="row blk-article__text" id="intro">
                    <div class="col-sm-12">
                    <p><span class="letter">W</span>hoa, wait a minute, Doc, are you telling me that my mother has got the hots for me? Uh, I think so. Marty, you seem so nervous, is something wrong? What about George? Alright, okay Jennifer. What if I send in the tape and they don't like it. I mean, what if they say I'm no good. What if they say, 'Get out of here, kid, you got no future.' I mean, I just don't think I can take that kind of rejection. Jesus, I'm beginning to sound like my old man.</p>
                    </div>
                </div>

                </div>
            </div>
            </div>
    </section>-->

    <!-- <section class="blk-timeline__wrapper section-wrapper"> 
            <div class="inview-wrapper blk-timeline">
            <div class="inview-content inview-full">
                <div class="container">
                <div class="row bottom blk-featpost__cover__title">
                </div>
                </div>
            </div>
            </div>
    </section>-->
  </div>
</template>

<script>
import JQuery from "jquery";
import Slick from "slick-carousel";
let $ = JQuery;

export default {
  name: "FrontPage",
  data() {
    return {
      slices: [],
      timeline_items: []
    };
  },
  methods: {
    getContent() {
      this.$prismic.client.getSingle("homepage").then(document => {
        if (document) {
          this.slices = document.data.body;
        } else {
          console.log("no home page found");
        }
      });
      //https://prismic.io/docs/vuejs/query-the-api/query-by-type
      this.$prismic.client
        .query(this.$prismic.Predicates.at("document.type", "timeline"), {
          orderings: "[my.timeline.order]"
        })
        .then(response => {
          // response is the response object, response.results holds the documents
          if (response) {
            this.timeline_items = response.results;
          } else {
            console.log("no timeline item was found");
          }
        });
    }
  },
  mounted: function() {
    $(document).ready(function() {
      var timelineQuote = setInterval(function() {
        if ($(".js-timeline-quote-slider").length > 0) {
          clearInterval(timelineQuote);
          var currentSlide = $('.js-timeline-quote-slider').find('.js-timeline-quote-slider--item')[0];
          var quoteBg = $(currentSlide).data('quote');
          $('.js-timeline-quote-slider--bg').css('background-image', 'url(' + quoteBg + ')');

          $(".js-timeline-quote-slider").slick({
            infinite: true,
            fade: true,
            arrows: false,
            autoplay: false,
            draggable: false
          });
          $(".js-timeline-quote-slider").on("afterChange", function(
            event,
            slick,
            currentSlide,
            nextSlide
          ) {
            var currentSlide = $(event.currentTarget).find('.slick-active');
            var quoteBg = $(currentSlide).find('.js-timeline-quote-slider--item').data('quote');
            $('.js-timeline-quote-slider--bg').css('background-image', 'url(' + quoteBg + ')');
          });
        }
      }, 300);
      
      var timelineMedia = setInterval(function() {
        if ($(".js-timeline-media-menu").length > 0) {
          clearInterval(timelineMedia);
          var mediaMenuItem = $('.js-timeline-media-menu-item');
          var mediaItem = $('.js-timeline-media-listing-item');
          var quoteSlider = $(".js-timeline-quote-slider");
          mediaMenuItem.on('click', function(e) {
            e.preventDefault();
            mediaMenuItem.removeClass('active');
            mediaItem.removeClass('active');
            var currentItem = $(this).data('item');
            $(this).addClass('active');
            $('.js-timeline-media-listing-item[data-item="'+currentItem+'"]').addClass('active');
            $(".js-timeline-quote-slider").slick('slickGoTo', parseInt(currentItem));
          });
        }
      }, 300);
    });
  },
  created() {
    this.getContent(this.$route.params.uid);
  },
  beforeRouteUpdate(to, from, next) {
    this.getContent(to.params.uid);
    next();
  },
  filters: {
    // Filter definitionsEW
    StyleFirstLetter(value) {
      return value;
    }
  }
};
</script>