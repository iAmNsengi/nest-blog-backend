'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">blog-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-06ac9ee390c35f260c7dec5b0eaf99c2a7dbcf5e036dceeb1f0faed02e6a50172b2ea5327466292573fa426913284f2d8cd580512c0469a9c0db19af388551b1"' : 'data-bs-target="#xs-controllers-links-module-AppModule-06ac9ee390c35f260c7dec5b0eaf99c2a7dbcf5e036dceeb1f0faed02e6a50172b2ea5327466292573fa426913284f2d8cd580512c0469a9c0db19af388551b1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-06ac9ee390c35f260c7dec5b0eaf99c2a7dbcf5e036dceeb1f0faed02e6a50172b2ea5327466292573fa426913284f2d8cd580512c0469a9c0db19af388551b1"' :
                                            'id="xs-controllers-links-module-AppModule-06ac9ee390c35f260c7dec5b0eaf99c2a7dbcf5e036dceeb1f0faed02e6a50172b2ea5327466292573fa426913284f2d8cd580512c0469a9c0db19af388551b1"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-06ac9ee390c35f260c7dec5b0eaf99c2a7dbcf5e036dceeb1f0faed02e6a50172b2ea5327466292573fa426913284f2d8cd580512c0469a9c0db19af388551b1"' : 'data-bs-target="#xs-injectables-links-module-AppModule-06ac9ee390c35f260c7dec5b0eaf99c2a7dbcf5e036dceeb1f0faed02e6a50172b2ea5327466292573fa426913284f2d8cd580512c0469a9c0db19af388551b1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-06ac9ee390c35f260c7dec5b0eaf99c2a7dbcf5e036dceeb1f0faed02e6a50172b2ea5327466292573fa426913284f2d8cd580512c0469a9c0db19af388551b1"' :
                                        'id="xs-injectables-links-module-AppModule-06ac9ee390c35f260c7dec5b0eaf99c2a7dbcf5e036dceeb1f0faed02e6a50172b2ea5327466292573fa426913284f2d8cd580512c0469a9c0db19af388551b1"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-958d3f9f597cda5efa45e783e14f2022f6ce9f20e5b091b33e31a3eacb78a5e1e637f2ab3d5319f4444d78dfff929fd6ff62dd081bafe6d84c8408dae6d3f96d"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-958d3f9f597cda5efa45e783e14f2022f6ce9f20e5b091b33e31a3eacb78a5e1e637f2ab3d5319f4444d78dfff929fd6ff62dd081bafe6d84c8408dae6d3f96d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-958d3f9f597cda5efa45e783e14f2022f6ce9f20e5b091b33e31a3eacb78a5e1e637f2ab3d5319f4444d78dfff929fd6ff62dd081bafe6d84c8408dae6d3f96d"' :
                                            'id="xs-controllers-links-module-AuthModule-958d3f9f597cda5efa45e783e14f2022f6ce9f20e5b091b33e31a3eacb78a5e1e637f2ab3d5319f4444d78dfff929fd6ff62dd081bafe6d84c8408dae6d3f96d"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-958d3f9f597cda5efa45e783e14f2022f6ce9f20e5b091b33e31a3eacb78a5e1e637f2ab3d5319f4444d78dfff929fd6ff62dd081bafe6d84c8408dae6d3f96d"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-958d3f9f597cda5efa45e783e14f2022f6ce9f20e5b091b33e31a3eacb78a5e1e637f2ab3d5319f4444d78dfff929fd6ff62dd081bafe6d84c8408dae6d3f96d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-958d3f9f597cda5efa45e783e14f2022f6ce9f20e5b091b33e31a3eacb78a5e1e637f2ab3d5319f4444d78dfff929fd6ff62dd081bafe6d84c8408dae6d3f96d"' :
                                        'id="xs-injectables-links-module-AuthModule-958d3f9f597cda5efa45e783e14f2022f6ce9f20e5b091b33e31a3eacb78a5e1e637f2ab3d5319f4444d78dfff929fd6ff62dd081bafe6d84c8408dae6d3f96d"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-64d6adbda3b3ac10e2272c69da55dedb733b07bfd23404cac6f4ca0b7118cdb48285bf45b0b11f06428d14882d772de81af0b7968efe7f19b30eb7f65fdc6f9c"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-64d6adbda3b3ac10e2272c69da55dedb733b07bfd23404cac6f4ca0b7118cdb48285bf45b0b11f06428d14882d772de81af0b7968efe7f19b30eb7f65fdc6f9c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-64d6adbda3b3ac10e2272c69da55dedb733b07bfd23404cac6f4ca0b7118cdb48285bf45b0b11f06428d14882d772de81af0b7968efe7f19b30eb7f65fdc6f9c"' :
                                            'id="xs-controllers-links-module-PostsModule-64d6adbda3b3ac10e2272c69da55dedb733b07bfd23404cac6f4ca0b7118cdb48285bf45b0b11f06428d14882d772de81af0b7968efe7f19b30eb7f65fdc6f9c"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-64d6adbda3b3ac10e2272c69da55dedb733b07bfd23404cac6f4ca0b7118cdb48285bf45b0b11f06428d14882d772de81af0b7968efe7f19b30eb7f65fdc6f9c"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-64d6adbda3b3ac10e2272c69da55dedb733b07bfd23404cac6f4ca0b7118cdb48285bf45b0b11f06428d14882d772de81af0b7968efe7f19b30eb7f65fdc6f9c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-64d6adbda3b3ac10e2272c69da55dedb733b07bfd23404cac6f4ca0b7118cdb48285bf45b0b11f06428d14882d772de81af0b7968efe7f19b30eb7f65fdc6f9c"' :
                                        'id="xs-injectables-links-module-PostsModule-64d6adbda3b3ac10e2272c69da55dedb733b07bfd23404cac6f4ca0b7118cdb48285bf45b0b11f06428d14882d772de81af0b7968efe7f19b30eb7f65fdc6f9c"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-19a68021ccc12a6a415056c83275d1d8a0639e5bbf1ce469b0129cd2497e141dab7e9b793da2429fb8a57b834a102f73400d99a024bdfcfd3523b435bdb2676c"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-19a68021ccc12a6a415056c83275d1d8a0639e5bbf1ce469b0129cd2497e141dab7e9b793da2429fb8a57b834a102f73400d99a024bdfcfd3523b435bdb2676c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-19a68021ccc12a6a415056c83275d1d8a0639e5bbf1ce469b0129cd2497e141dab7e9b793da2429fb8a57b834a102f73400d99a024bdfcfd3523b435bdb2676c"' :
                                            'id="xs-controllers-links-module-UsersModule-19a68021ccc12a6a415056c83275d1d8a0639e5bbf1ce469b0129cd2497e141dab7e9b793da2429fb8a57b834a102f73400d99a024bdfcfd3523b435bdb2676c"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-19a68021ccc12a6a415056c83275d1d8a0639e5bbf1ce469b0129cd2497e141dab7e9b793da2429fb8a57b834a102f73400d99a024bdfcfd3523b435bdb2676c"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-19a68021ccc12a6a415056c83275d1d8a0639e5bbf1ce469b0129cd2497e141dab7e9b793da2429fb8a57b834a102f73400d99a024bdfcfd3523b435bdb2676c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-19a68021ccc12a6a415056c83275d1d8a0639e5bbf1ce469b0129cd2497e141dab7e9b793da2429fb8a57b834a102f73400d99a024bdfcfd3523b435bdb2676c"' :
                                        'id="xs-injectables-links-module-UsersModule-19a68021ccc12a6a415056c83275d1d8a0639e5bbf1ce469b0129cd2497e141dab7e9b793da2429fb8a57b834a102f73400d99a024bdfcfd3523b435bdb2676c"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDTO.html" data-type="entity-link" >CreatePostDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionsDTO.html" data-type="entity-link" >CreatePostMetaOptionsDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDTO.html" data-type="entity-link" >CreateUserDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDTO.html" data-type="entity-link" >GetUsersParamDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDTO.html" data-type="entity-link" >PatchPostDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDTO.html" data-type="entity-link" >PatchUserDTO</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsService.html" data-type="entity-link" >PostsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});