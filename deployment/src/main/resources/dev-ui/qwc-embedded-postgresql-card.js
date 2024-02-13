import { LitElement, html, css} from 'lit';
import { pages } from 'build-time-data';
import {JsonRpc} from 'jsonrpc';
import 'qwc/qwc-extension-link.js';

export class QwcEmbeddedPostgreSQLCard extends LitElement {

    jsonRpc = new JsonRpc(this);

    static styles = css`
      .identity {
        display: flex;
        justify-content: flex-start;
      }

      .description {
        padding-bottom: 10px;
      }

      .logo {
        padding-bottom: 10px;
        margin-right: 5px;
      }

      .card-content {
        color: var(--lumo-contrast-90pct);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 2px 2px;
        height: 100%;
      }

      .card-content slot {
        display: flex;
        flex-flow: column wrap;
        padding-top: 5px;
      }
    `;

    static properties = {
        extensionName: {attribute: true},
        description: {attribute: true},
        guide: {attribute: true},
        namespace: {attribute: true},
    };

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
    }

    render() {
        return html`<div class="card-content" slot="content">
            <div class="identity">
                <div class="logo">
                    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iDQogICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KDQo8c3ZnIHdpZHRoPSI0MzIuMDcxcHQiIGhlaWdodD0iNDQ1LjM4M3B0IiB2aWV3Qm94PSIwIDAgNDMyLjA3MSA0NDUuMzgzIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPGcgaWQ9Im9yZ2luYWwiIHN0eWxlPSJmaWxsLXJ1bGU6bm9uemVybztjbGlwLXJ1bGU6bm9uemVybztzdHJva2U6IzAwMDAwMDtzdHJva2UtbWl0ZXJsaW1pdDo0OyI+DQoJPC9nPg0KPGcgaWQ9IkxheWVyX3gwMDIwXzMiIHN0eWxlPSJmaWxsLXJ1bGU6bm9uemVybztjbGlwLXJ1bGU6bm9uemVybztmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLXdpZHRoOjEyLjQ2NTE7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7Ij4NCjxwYXRoIHN0eWxlPSJmaWxsOiMwMDAwMDA7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjM3LjM5NTM7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7IiBkPSJNMzIzLjIwNSwzMjQuMjI3YzIuODMzLTIzLjYwMSwxLjk4NC0yNy4wNjIsMTkuNTYzLTIzLjIzOWw0LjQ2MywwLjM5MmMxMy41MTcsMC42MTUsMzEuMTk5LTIuMTc0LDQxLjU4Ny03YzIyLjM2Mi0xMC4zNzYsMzUuNjIyLTI3LjcsMTMuNTcyLTIzLjE0OGMtNTAuMjk3LDEwLjM3Ni01My43NTUtNi42NTUtNTMuNzU1LTYuNjU1YzUzLjExMS03OC44MDMsNzUuMzEzLTE3OC44MzYsNTYuMTQ5LTIwMy4zMjIgICAgQzM1Mi41MTQtNS41MzQsMjYyLjAzNiwyNi4wNDksMjYwLjUyMiwyNi44NjlsLTAuNDgyLDAuMDg5Yy05LjkzOC0yLjA2Mi0yMS4wNi0zLjI5NC0zMy41NTQtMy40OTZjLTIyLjc2MS0wLjM3NC00MC4wMzIsNS45NjctNTMuMTMzLDE1LjkwNGMwLDAtMTYxLjQwOC02Ni40OTgtMTUzLjg5OSw4My42MjhjMS41OTcsMzEuOTM2LDQ1Ljc3NywyNDEuNjU1LDk4LjQ3LDE3OC4zMSAgICBjMTkuMjU5LTIzLjE2MywzNy44NzEtNDIuNzQ4LDM3Ljg3MS00Mi43NDhjOS4yNDIsNi4xNCwyMC4zMDcsOS4yNzIsMzEuOTEyLDguMTQ3bDAuODk3LTAuNzY1Yy0wLjI4MSwyLjg3Ni0wLjE1Nyw1LjY4OSwwLjM1OSw5LjAxOWMtMTMuNTcyLDE1LjE2Ny05LjU4NCwxNy44My0zNi43MjMsMjMuNDE2Yy0yNy40NTcsNS42NTktMTEuMzI2LDE1LjczNC0wLjc5NywxOC4zNjdjMTIuNzY4LDMuMTkzLDQyLjMwNSw3LjcxNiw2Mi4yNjgtMjAuMjI0ICAgIGwtMC43OTUsMy4xODhjNS4zMjUsNC4yNiw0Ljk2NSwzMC42MTksNS43Miw0OS40NTJjMC43NTYsMTguODM0LDIuMDE3LDM2LjQwOSw1Ljg1Niw0Ni43NzFjMy44MzksMTAuMzYsOC4zNjksMzcuMDUsNDQuMDM2LDI5LjQwNmMyOS44MDktNi4zODgsNTIuNi0xNS41ODIsNTQuNjc3LTEwMS4xMDciLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiMzMzY3OTE7c3Ryb2tlOm5vbmU7IiBkPSJNNDAyLjM5NSwyNzEuMjNjLTUwLjMwMiwxMC4zNzYtNTMuNzYtNi42NTUtNTMuNzYtNi42NTVjNTMuMTExLTc4LjgwOCw3NS4zMTMtMTc4Ljg0Myw1Ni4xNTMtMjAzLjMyNmMtNTIuMjctNjYuNzg1LTE0Mi43NTItMzUuMi0xNDQuMjYyLTM0LjM4bC0wLjQ4NiwwLjA4N2MtOS45MzgtMi4wNjMtMjEuMDYtMy4yOTItMzMuNTYtMy40OTZjLTIyLjc2MS0wLjM3My00MC4wMjYsNS45NjctNTMuMTI3LDE1LjkwMiAgICBjMCwwLTE2MS40MTEtNjYuNDk1LTE1My45MDQsODMuNjNjMS41OTcsMzEuOTM4LDQ1Ljc3NiwyNDEuNjU3LDk4LjQ3MSwxNzguMzEyYzE5LjI2LTIzLjE2MywzNy44NjktNDIuNzQ4LDM3Ljg2OS00Mi43NDhjOS4yNDMsNi4xNCwyMC4zMDgsOS4yNzIsMzEuOTA4LDguMTQ3bDAuOTAxLTAuNzY1Yy0wLjI4LDIuODc2LTAuMTUyLDUuNjg5LDAuMzYxLDkuMDE5Yy0xMy41NzUsMTUuMTY3LTkuNTg2LDE3LjgzLTM2LjcyMywyMy40MTYgICAgYy0yNy40NTksNS42NTktMTEuMzI4LDE1LjczNC0wLjc5NiwxOC4zNjdjMTIuNzY4LDMuMTkzLDQyLjMwNyw3LjcxNiw2Mi4yNjYtMjAuMjI0bC0wLjc5NiwzLjE4OGM1LjMxOSw0LjI2LDkuMDU0LDI3LjcxMSw4LjQyOCw0OC45NjljLTAuNjI2LDIxLjI1OS0xLjA0NCwzNS44NTQsMy4xNDcsNDcuMjU0YzQuMTkxLDExLjQsOC4zNjgsMzcuMDUsNDQuMDQyLDI5LjQwNmMyOS44MDktNi4zODgsNDUuMjU2LTIyLjk0Miw0Ny40MDUtNTAuNTU1ICAgIGMxLjUyNS0xOS42MzEsNC45NzYtMTYuNzI5LDUuMTk0LTM0LjI4bDIuNzY4LTguMzA5YzMuMTkyLTI2LjYxMSwwLjUwNy0zNS4xOTYsMTguODcyLTMxLjIwM2w0LjQ2MywwLjM5MmMxMy41MTcsMC42MTUsMzEuMjA4LTIuMTc0LDQxLjU5MS03YzIyLjM1OC0xMC4zNzYsMzUuNjE4LTI3LjcsMTMuNTczLTIzLjE0OHoiLz4NCjxwYXRoIGQ9Ik0yMTUuODY2LDI4Ni40ODRjLTEuMzg1LDQ5LjUxNiwwLjM0OCw5OS4zNzcsNS4xOTMsMTExLjQ5NWM0Ljg0OCwxMi4xMTgsMTUuMjIzLDM1LjY4OCw1MC45LDI4LjA0NWMyOS44MDYtNi4zOSw0MC42NTEtMTguNzU2LDQ1LjM1Ny00Ni4wNTFjMy40NjYtMjAuMDgyLDEwLjE0OC03NS44NTQsMTEuMDA1LTg3LjI4MSIvPg0KPHBhdGggZD0iTTE3My4xMDQsMzguMjU2YzAsMC0xNjEuNTIxLTY2LjAxNi0xNTQuMDEyLDg0LjEwOWMxLjU5NywzMS45MzgsNDUuNzc5LDI0MS42NjQsOTguNDczLDE3OC4zMTZjMTkuMjU2LTIzLjE2NiwzNi42NzEtNDEuMzM1LDM2LjY3MS00MS4zMzUiLz4NCjxwYXRoIGQ9Ik0yNjAuMzQ5LDI2LjIwN2MtNS41OTEsMS43NTMsODkuODQ4LTM0Ljg4OSwxNDQuMDg3LDM0LjQxN2MxOS4xNTksMjQuNDg0LTMuMDQzLDEyNC41MTktNTYuMTUzLDIwMy4zMjkiLz4NCjxwYXRoIHN0eWxlPSJzdHJva2UtbGluZWpvaW46YmV2ZWw7IiBkPSJNMzQ4LjI4MiwyNjMuOTUzYzAsMCwzLjQ2MSwxNy4wMzYsNTMuNzY0LDYuNjUzYzIyLjA0LTQuNTUyLDguNzc2LDEyLjc3NC0xMy41NzcsMjMuMTU1Yy0xOC4zNDUsOC41MTQtNTkuNDc0LDEwLjY5Ni02MC4xNDYtMS4wNjljLTEuNzI5LTMwLjM1NSwyMS42NDctMjEuMTMzLDE5Ljk2LTI4LjczOWMtMS41MjUtNi44NS0xMS45NzktMTMuNTczLTE4Ljg5NC0zMC4zMzggICAgYy02LjAzNy0xNC42MzMtODIuNzk2LTEyNi44NDksMjEuMjg3LTExMC4xODNjMy44MTMtMC43ODktMjcuMTQ2LTk5LjAwMi0xMjQuNTUzLTEwMC41OTljLTk3LjM4NS0xLjU5Ny05NC4xOSwxMTkuNzYyLTk0LjE5LDExOS43NjIiLz4NCjxwYXRoIGQ9Ik0xODguNjA0LDI3NC4zMzRjLTEzLjU3NywxNS4xNjYtOS41ODQsMTcuODI5LTM2LjcyMywyMy40MTdjLTI3LjQ1OSw1LjY2LTExLjMyNiwxNS43MzMtMC43OTcsMTguMzY1YzEyLjc2OCwzLjE5NSw0Mi4zMDcsNy43MTgsNjIuMjY2LTIwLjIyOWM2LjA3OC04LjUwOS0wLjAzNi0yMi4wODYtOC4zODUtMjUuNTQ3Yy00LjAzNC0xLjY3MS05LjQyOC0zLjc2NS0xNi4zNjEsMy45OTR6Ii8+DQo8cGF0aCBkPSJNMTg3LjcxNSwyNzQuMDY5Yy0xLjM2OC04LjkxNywyLjkzLTE5LjUyOCw3LjUzNi0zMS45NDJjNi45MjItMTguNjI2LDIyLjg5My0zNy4yNTUsMTAuMTE3LTk2LjMzOWMtOS41MjMtNDQuMDI5LTczLjM5Ni05LjE2My03My40MzYtMy4xOTNjLTAuMDM5LDUuOTY4LDIuODg5LDMwLjI2LTEuMDY3LDU4LjU0OGMtNS4xNjIsMzYuOTEzLDIzLjQ4OCw2OC4xMzIsNTYuNDc5LDY0LjkzOCIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjtzdHJva2Utd2lkdGg6NC4xNTU7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7IiBkPSJNMTcyLjUxNywxNDEuN2MtMC4yODgsMi4wMzksMy43MzMsNy40OCw4Ljk3Niw4LjIwN2M1LjIzNCwwLjczLDkuNzE0LTMuNTIyLDkuOTk4LTUuNTU5YzAuMjg0LTIuMDM5LTMuNzMyLTQuMjg1LTguOTc3LTUuMDE1Yy01LjIzNy0wLjczMS05LjcxOSwwLjMzMy05Ljk5NiwyLjM2N3oiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7c3Ryb2tlLXdpZHRoOjIuMDc3NTtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjsiIGQ9Ik0zMzEuOTQxLDEzNy41NDNjMC4yODQsMi4wMzktMy43MzIsNy40OC04Ljk3Niw4LjIwN2MtNS4yMzgsMC43My05LjcxOC0zLjUyMi0xMC4wMDUtNS41NTljLTAuMjc3LTIuMDM5LDMuNzQtNC4yODUsOC45NzktNS4wMTVjNS4yMzktMC43Myw5LjcxOCwwLjMzMywxMC4wMDIsMi4zNjh6Ii8+DQo8cGF0aCBkPSJNMzUwLjY3NiwxMjMuNDMyYzAuODYzLDE1Ljk5NC0zLjQ0NSwyNi44ODgtMy45ODgsNDMuOTE0Yy0wLjgwNCwyNC43NDgsMTEuNzk5LDUzLjA3NC03LjE5MSw4MS40MzUiLz4NCjxwYXRoIHN0eWxlPSJzdHJva2Utd2lkdGg6MzsiIGQ9Ik0wLDYwLjIzMiIvPg0KPC9nPg0KPC9zdmc+"
                                       alt="${this.extensionName}" 
                                       title="${this.extensionName}"
                                       width="32" 
                                       height="32">
                </div>
                <div class="description">${this.description}</div>
            </div>
            ${this._renderCardLinks()}
        </div>
        `;
    }

    _renderCardLinks(){
        return html`${pages.map(page => html`
                            <qwc-extension-link slot="link"
                                namespace="${this.namespace}"
                                extensionName="${this.extensionName}"
                                iconName="${page.icon}"
                                displayName="${page.title}"
                                staticLabel="${page.staticLabel}"
                                dynamicLabel="${page.dynamicLabel}"
                                streamingLabel="${page.streamingLabel}"
                                path="${page.id}"
                                ?embed=${page.embed}
                                externalUrl="${page.metadata.externalUrl}"
                                webcomponent="${page.componentLink}" >
                            </qwc-extension-link>
                        `)}`;
    }

}
customElements.define('qwc-embedded-postgresql-card', QwcEmbeddedPostgreSQLCard);