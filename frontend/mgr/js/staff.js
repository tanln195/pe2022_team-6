function sendAddEmployeeRequest(name, email) {
	var myHeaders = new Headers();
	myHeaders.append("Accept", "application/json");
	myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

	var formData = new FormData();
	formData.append(
		"image",
		document.querySelector("#images").files[0],
		"Screenshot from 2022-05-30 09-59-18.png",
	);
	formData.append(
		"text",
		JSON.stringify({
			ename: name,
			mail: email,
			bid: localStorage.getItem("bid"),
			erole: "EMP",
		}),
	);

	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: formData,
		redirect: "follow",
	};

	fetch("https://tiemthuocgiadinh.click/employee", requestOptions)
		.then((response) => console.log(response))
		.catch((error) => console.log("error", error));
}

function addEmployeeHandler() {
	//get data from user input
	const name = document.querySelector("#name").value;
	const email = document.querySelector("#email").value;
	sendAddEmployeeRequest(name, email);

	//create new element
	const employeeEl = document.createElement("li");
	employeeEl.classList.add("employee");
	employeeEl.innerHTML = `
        <div class="info">
            <img class="avatar" src="${URL.createObjectURL(
				document.querySelector("#images").files[0],
			)}" alt="avatar">
            <p class="name">${name}</p>
        </div>
        <p class="birthday">${email}</p>
        <button class="delete" onclick="deleteEmployeeHandler(event)">
            <ion-icon name="trash-outline"></ion-icon>
        </button>
`;
	document.querySelector(".employees").appendChild(employeeEl);
}

async function sendDeleteEmployeeRequest(id) {
	try {
		const response = await fetch(`https://tiemthuocgiadinh.click/employee?employeeID=${id}`, {
			method: "DELETE",
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		});
		console.log("🚀 -> response", response);
	} catch (err) {
		alert(err);
	}
}

function deleteEmployeeHandler(e, id) {
	const employeeEl = e.target.closest(".employee");
	employeeEl.remove(this);
	sendDeleteEmployeeRequest(id);
}

async function getStaffData() {
	const response = await fetch(
		`https://tiemthuocgiadinh.click/employee?bid=${localStorage.getItem("bid") || 1}`,
		{
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
			},
		},
	);
	const staffData = await response.json();
	console.log("🚀 -> staffData", staffData);
	return staffData.filter((staff) => staff.erole === "EMP");
}

async function showStaffContent() {
	const staffData = await getStaffData();
	console.log("🚀 -> staffData", staffData);
	const staffHTML = `
     <div class="header">
                    <h2>STAFF</h2>
                    <div class="branch-details">
                        <ion-icon name="storefront-outline"></ion-icon>
                        <div class="info">
                            <h3>${localStorage.getItem("bname")}</h3>
                            <p>${localStorage.getItem("addr")}</p>
                        </div>
                    </div>
                </div>
                <div class="staff-main">
                    <div class="left-side">
                        <div class="form">
                            <div class="element">
                                <label for="name">Name</label>
                                <input type="text" name="name" id="name" autocomplete="">
                            </div>
                            <div class="element">
                                <label for="email">Email</label>
                                <input type="email" name="email" id="email">
                            </div>
                            <div class="element">
                                <label for="images">Images</label>
                                <input type="file" name="images" id="images">
                            </div>
                            <button class="btn" onclick="addEmployeeHandler()">Add new Employee</button>
                            <svg
                                class="character"
                                width="241"
                                height="336"
                                viewBox="0 0 241 336"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g>
                                    <path id="Vector" d="M6.93007 256.814L36.743 319.182L33.0458 320.95C31.7976 321.546 30.3642 321.623 29.0604 321.162C27.7565 320.702 26.6886 319.742 26.0927 318.495L0.776193 265.535C0.180297 264.288 0.103706 262.854 0.563854 261.55C1.0247 260.246 1.98468 259.179 3.23217 258.582L6.93007 256.814Z" fill="#3A4279"/>
                                    <path id="Vector_2" d="M39.3886 242.73L18.8135 251.236L30.3562 267.559L48.5964 261.993L39.3886 242.73Z" fill="#FFCCB3"/>
                                    <path id="Vector_3" d="M26.2462 251.887C26.2462 251.887 34.279 264.295 35.4909 271.227C36.7022 278.16 40.8526 313.227 39.736 316.388C38.9333 318.66 36.0179 319.635 34.1683 319.842C33.7624 319.885 33.3531 319.801 32.9974 319.601C32.6416 319.401 32.3562 319.095 32.1822 318.726L5.11971 262.113C4.66722 261.168 4.60389 260.084 4.94222 259.093C5.28124 258.102 5.99478 257.284 6.93109 256.814C10.6749 254.933 16.4021 252.114 18.8135 251.236C22.5406 249.88 25.0008 249.888 26.2462 251.887Z" fill="#6392E8"/>
                                    <path id="Vector_4" d="M171.896 281.568L143.936 333.181C143.278 334.397 142.163 335.301 140.838 335.695C139.512 336.089 138.084 335.94 136.869 335.282L133.265 333.33L166.191 272.548L169.795 274.501C171.011 275.159 171.916 276.274 172.31 277.599C172.704 278.924 172.556 280.352 171.896 281.568Z" fill="#3A4279"/>
                                    <path id="Vector_5" d="M134.488 256.843L154.607 266.377L142.254 282.096L124.318 275.616L134.488 256.843Z" fill="#FFCCB3"/>
                                    <path id="Vector_6" d="M147.15 266.652C147.15 266.652 138.5 278.637 136.94 285.499C135.38 292.362 129.463 327.174 130.418 330.388C131.105 332.698 133.967 333.819 135.804 334.118C136.207 334.182 136.62 334.119 136.986 333.937C137.351 333.756 137.651 333.465 137.844 333.105L167.733 277.931C168.232 277.011 168.351 275.931 168.063 274.925C167.774 273.917 167.103 273.064 166.192 272.547C162.548 270.48 156.97 267.375 154.606 266.377C150.952 264.834 148.495 264.717 147.15 266.652Z" fill="#6392E8"/>
                                    <path id="Vector_7" d="M195.099 183.321C195.099 183.321 202.801 221.569 196.824 229.063L44.5191 268.062L31.5312 243.734L120.47 203.376L138.282 178.962L195.099 183.321Z" fill="#5E5D9A"/>
                                    <path id="Vector_8" d="M83.8226 181.09C83.8226 181.09 40.7559 178.754 19.4095 180.63C5.66418 181.838 0.709057 217.012 11.6781 223.411L129.4 283.687L143.272 258.619L67.3311 207.215L121.661 199.573L83.8226 181.09Z" fill="#5E5D9A"/>
                                    <path id="Vector_9" d="M23.0297 226.405C35.7482 226.405 46.0587 216.095 46.0587 203.376C46.0587 190.657 35.7482 180.347 23.0297 180.347C10.3105 180.347 0 190.657 0 203.376C0 216.095 10.3105 226.405 23.0297 226.405Z" fill="#5E5D9A"/>
                                    <path id="Vector_10" d="M192.998 229.379C205.717 229.379 216.028 219.069 216.028 206.349C216.028 193.631 205.717 183.32 192.998 183.32C180.279 183.32 169.969 193.631 169.969 206.349C169.969 219.069 180.279 229.379 192.998 229.379Z" fill="#5E5D9A"/>
                                    <path id="Vector_11" d="M141.342 109.706C149.635 106.928 154.106 97.9532 151.329 89.6601C148.551 81.367 139.576 76.8957 131.283 79.6733C122.99 82.4509 118.518 91.4262 121.296 99.7193C124.074 108.012 133.049 112.484 141.342 109.706Z" fill="#6392E8"/>
                                    <path id="Vector_12" d="M139.933 122.545C139.517 120.042 138.686 115.035 137.792 110.472L133.037 88.3867C133.037 88.3867 145.806 107.259 151.689 120.404C156.046 130.255 161.1 140.295 161.936 148.789L151.903 136.822L141.172 124.033L139.933 122.545Z" fill="#3A4279"/>
                                    <path id="Vector_13" d="M223.729 59.417L230.689 46.5684L223.729 59.417Z" fill="#E56441"/>
                                    <path id="Vector_14" d="M228.289 61.4987L235.874 49.5327L228.289 61.4987Z" fill="#E56441"/>
                                    <path id="Vector_15" d="M233.708 63.7991L238.043 56.5522L233.708 63.7991Z" fill="#E56441"/>
                                    <path id="Vector_16" d="M222.009 70.7293C221.972 66.2809 219.303 60.897 219.303 60.897L222.009 70.7293Z" fill="#E56441"/>
                                    <g id="hand">
                                        <path id="Vector_17" d="M129.913 97.6787C127.487 85.7009 133.193 86.01 135.092 84.1054C135.092 84.1054 142.215 78.2313 147.643 83.7071C153.388 89.499 186.322 134.491 186.322 134.491L165.715 153.443L161.842 148.821L151.808 136.855L141.077 124.065L139.744 122.609L125.267 106.211C125.267 106.211 131.285 103.984 129.913 97.6787Z" fill="#6392E8"/>
                                        <path id="Vector_18" d="M206.904 83.8368C211.801 74.906 209.448 73.3898 211.531 68.308C213.583 63.3494 209.939 51.0583 213.428 52.734C216.916 54.4103 217.995 58.8642 217.995 58.8642C220.381 54.6442 222.578 46.8794 228.288 45.9904C234 45.1015 234.506 46.8989 237.743 49.5554C246.355 56.7207 235.373 67.4893 233.54 71.5903C232.361 74.1604 223.696 81.9969 222.736 83.7101L218.375 90.0359L206.904 83.8368Z" fill="#FFCCB3"/>
                                        <path
                                            id="Vector_19"
                                            d="M223.729 59.417L230.689 46.5684"
                                            stroke="#E56441"
                                            stroke-width="0.94666"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            id="Vector_20"
                                            d="M228.289 61.4987L235.874 49.5327"
                                            stroke="#E56441"
                                            stroke-width="0.94666"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            id="Vector_21"
                                            d="M233.708 63.7991L238.043 56.5522"
                                            stroke="#E56441"
                                            stroke-width="0.94666"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            id="Vector_22"
                                            d="M222.009 70.7293C221.972 66.2809 219.303 60.897 219.303 60.897"
                                            stroke="#E56441"
                                            stroke-width="0.94666"
                                            stroke-linecap="round"
                                        />
                                        <path id="Vector_23" d="M165.542 134.132L207.445 78.3291C207.711 78.0012 208.091 77.784 208.508 77.7193C208.926 77.6539 209.354 77.7458 209.707 77.9776L220.68 85.2334C221.201 85.5871 221.572 86.1217 221.722 86.7329C221.872 87.3448 221.788 87.9908 221.488 88.5443L187.791 150.688L165.542 134.132Z" fill="#6392E8"/>
                                    </g>
                                    <path id="Vector_24" d="M175.722 157.701C183.472 157.701 189.754 151.419 189.754 143.669C189.754 135.92 183.472 129.637 175.722 129.637C167.972 129.637 161.689 135.92 161.689 143.669C161.689 151.419 167.972 157.701 175.722 157.701Z" fill="#6392E8"/>
                                    <path id="Vector_25" d="M113.496 71.77C113.496 71.77 137.01 77.9928 141.047 79.6079C145.084 81.2222 145.352 87.681 145.622 92.256C145.89 96.8304 144.987 199.573 144.987 199.573L92.9462 197.572L54.0278 174.79C54.0278 174.79 55.7194 93.2682 56.2583 89.5007C56.7964 85.7332 52.5673 82.4885 57.1514 80.5922L86.619 72.808L113.496 71.77Z" fill="#6392E8"/>
                                    <path id="Vector_26" d="M74.3373 108.371L74.7563 184.281L52.3838 159.345L63.2081 106.009L74.3373 108.371Z" fill="#3A4279"/>
                                    <path id="Vector_27" d="M82.7832 73.9679C82.7832 73.9679 79.4543 80.6634 82.7832 85.2816C86.1122 89.8998 99.4391 94.3857 108.544 94.2541C117.648 94.1219 122.472 85.4417 118.345 73.2885L103.266 69.0518L86.6211 72.8081L82.7832 73.9679Z" fill="#3A4279"/>
                                    <path id="Vector_28" d="M120.472 16.2686C120.472 16.2686 127.029 30.4162 120.036 33.3386C113.043 36.261 113.858 16.9549 120.472 16.2686Z" fill="#93523E"/>
                                    <path id="Vector_29" d="M113.076 61.5408L114.973 82.929C114.973 82.929 116.792 85.7964 109.71 87.3021C105.154 88.2711 92.8863 83.4378 90.5069 81.9878C89.4947 81.4504 88.7018 80.5767 88.2646 79.5179C87.8274 78.4591 87.7724 77.2805 88.1108 76.1862C88.834 73.568 91.8309 51.7642 91.8309 51.7642L113.076 61.5408Z" fill="#FFCCB3"/>
                                    <path id="Vector_30" d="M113.442 65.6639L102.143 60.0815L114.74 80.2919L113.442 65.6639Z" fill="#FF967C"/>
                                    <path id="Vector_31" d="M116.708 20.3631C116.708 20.3631 123.339 36.9939 125.744 48.6612C128.171 60.4316 124.299 63.3714 119.189 65.1027C115.16 66.4678 108.725 67.5566 104.347 66.1866C96.3651 63.6874 88.5558 56.4747 86.6881 54.9933C83.7963 52.6995 80.9407 42.295 85.1795 36.4085C89.4183 30.5226 106.118 12.0248 116.708 20.3631Z" fill="#FFCCB3"/>
                                    <path id="eye" d="M108.17 43.3188C109.052 42.9721 109.337 41.5993 108.807 40.2537C108.278 38.9074 107.134 38.0978 106.252 38.4444C105.37 38.7911 105.084 40.1639 105.613 41.5102C106.143 42.8559 107.288 43.6662 108.17 43.3188Z" fill="#080B09"/>
                                    <path id="eye" d="M120.291 38.4621C121.173 38.1154 121.458 36.7427 120.928 35.3963C120.399 34.0507 119.255 33.2404 118.373 33.5877C117.491 33.9344 117.205 35.3072 117.735 36.6529C118.264 37.9992 119.409 38.8088 120.291 38.4621Z" fill="#080B09"/>
                                    <path id="Vector_32" d="M115.845 40.7588C115.845 40.7588 114.768 44.0181 117.032 43.7007C119.184 43.3227 120.643 44.3857 118.764 46.5695" fill="#E56441"/>
                                    <path
                                        id="Vector_33"
                                        d="M115.845 40.7588C115.845 40.7588 114.768 44.0181 117.032 43.7007C119.184 43.3227 120.643 44.3857 118.764 46.5695"
                                        stroke="#E56441"
                                        stroke-width="0.94666"
                                        stroke-linecap="round"
                                    />
                                    <path
                                        id="Vector_34"
                                        d="M118.869 49.4505L118.88 49.4478L118.891 49.4443C118.922 49.4352 118.956 49.4338 118.987 49.4415C119.019 49.4492 119.048 49.4652 119.072 49.4881C119.096 49.5104 119.113 49.5397 119.122 49.571C119.131 49.6023 119.131 49.6357 119.123 49.6677L119.116 49.6949L119.113 49.7227C118.975 51.1491 118.62 51.9963 118.189 52.4732C117.772 52.9333 117.25 53.0865 116.658 53.0412C116.05 52.9953 115.383 52.7391 114.736 52.3876C114.097 52.0402 113.503 51.6134 113.044 51.2473C113.013 51.218 112.99 51.1811 112.977 51.1408C112.963 51.0976 112.962 51.0517 112.973 51.0085C112.984 50.9646 113.007 50.925 113.038 50.8929C113.07 50.8616 113.11 50.8393 113.154 50.8289L113.157 50.8275C114.907 50.3848 117.547 49.7624 118.869 49.4505Z"
                                        fill="#E56441"
                                        stroke="#E56441"
                                    />
                                    <path id="eyebrow" d="M100.491 37.62L100.657 37.8525C100.869 38.2124 101.215 38.4742 101.62 38.58C102.023 38.6858 102.453 38.628 102.815 38.4178L108.931 34.6496C109.235 34.479 109.464 34.2013 109.572 33.8706C109.68 33.5399 109.661 33.18 109.517 32.8633C109.437 32.6656 109.318 32.486 109.164 32.3377C109.011 32.1894 108.827 32.0753 108.626 32.0029C108.426 31.9312 108.211 31.9019 107.999 31.9186C107.786 31.9353 107.579 31.9966 107.392 32.0989L101.109 35.6353C100.936 35.7223 100.782 35.8435 100.656 35.9917C100.531 36.1393 100.436 36.3113 100.378 36.4965C100.321 36.6816 100.301 36.8765 100.321 37.0701C100.339 37.2629 100.398 37.4502 100.491 37.62Z" fill="#080B09"/>
                                    <path id="eyebrow" d="M121.622 27.9549L114.443 28.6205C114.231 28.6427 114.026 28.7096 113.841 28.8175C113.657 28.9247 113.497 29.0702 113.373 29.2435C113.25 29.4168 113.164 29.6152 113.122 29.8241C113.08 30.0336 113.083 30.2494 113.131 30.4576C113.192 30.8001 113.38 31.1071 113.657 31.3173C113.935 31.5275 114.281 31.6264 114.628 31.5937L121.802 31.2136C122.219 31.1808 122.606 30.9838 122.878 30.6671C123.15 30.3503 123.286 29.9382 123.255 29.5212L123.26 29.2358C123.24 29.043 123.181 28.8557 123.087 28.6859C122.993 28.516 122.865 28.3671 122.713 28.248C122.56 28.1283 122.384 28.0406 122.197 27.9905C122.01 27.9403 121.814 27.9278 121.622 27.9549Z" fill="#080B09"/>
                                    <path id="Vector_35" d="M108.475 23.6813C108.475 23.6813 104.892 30.4993 98.3918 32.5216C91.8912 34.5432 95.4437 44.8029 95.4437 44.8029C95.4437 44.8029 90.9863 40.3692 85.862 42.8648C80.7384 45.3612 84.6277 55.1566 91.7068 55.2819L89.7813 66.3046C89.7813 66.3046 86.1961 61.8395 82.4258 59.4504C78.6548 57.0619 65.1093 47.7879 71.0934 35.5749C71.0934 35.5749 66.4118 18.4248 79.2514 9.53365C92.091 0.641849 103.204 3.99724 103.204 3.99724C103.204 3.99724 106.265 -0.858349 113.36 0.133651C120.455 1.12565 122.091 13.9193 119.742 18.5466C117.392 23.1738 113.563 25.1404 108.475 23.6813Z" fill="#93523E"/>
                                    <path id="Vector_36" d="M54.9838 92.0382C64.0127 83.8028 66.6789 88.8561 69.2888 89.507C69.2888 89.507 77.9877 92.6 76.0789 100.07C74.0615 107.975 52.3823 159.345 52.3823 159.345L25.5356 151.404L27.5113 145.706L32.6223 130.95L38.0815 115.172L38.6454 113.28L45.2754 92.435C45.2754 92.435 50.2786 96.4545 54.9838 92.0382Z" fill="#6392E8"/>
                                    <path id="Vector_37" d="M72.8654 106.29C78.5535 99.6456 77.778 89.6484 71.1341 83.9609C64.4901 78.2727 54.4928 79.0482 48.8054 85.6922C43.1172 92.3362 43.892 102.333 50.5367 108.021C57.1806 113.709 67.1772 112.934 72.8654 106.29Z" fill="#6392E8"/>
                                    <path id="Vector_38" d="M38.9384 169.606C46.6885 169.606 52.9712 163.324 52.9712 155.574C52.9712 147.824 46.6885 141.542 38.9384 141.542C31.1889 141.542 24.9062 147.824 24.9062 155.574C24.9062 163.324 31.1889 169.606 38.9384 169.606Z" fill="#6392E8"/>
                                    <path id="Vector_39" d="M120.028 137.319L92.9779 212.26H38.5898C38.5898 209.972 39.499 207.777 41.1168 206.159C42.7354 204.541 44.9296 203.632 47.2178 203.632H86.5657L109.923 137.319H120.028Z" fill="white"/>
                                    <path id="Vector_40" d="M120.026 137.319H192.999L164.777 212.26H92.9766L120.026 137.319Z" fill="url(#paint0_linear_277_145)"/>
                                    <path id="Vector_41" d="M49.7255 146.728L99.5678 195.569C99.8581 195.876 100.024 196.28 100.034 196.703C100.043 197.126 99.8964 197.537 99.6207 197.858L90.992 207.787C90.5737 208.257 89.9952 208.556 89.3686 208.624C88.7428 208.692 88.1135 208.525 87.6039 208.155L30.4014 166.62L49.7255 146.728Z" fill="#6392E8"/>
                                </g>
                                <defs>
                                    <linearGradient
                                        id="paint0_linear_277_145"
                                        x1="140.498"
                                        y1="137.141"
                                        x2="153.471"
                                        y2="296.846"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stop-color="white"/>
                                        <stop offset="1" stop-color="#94B9FF"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <div class="right-side">
                        <h3>
                            <span>Employess</span>
                            <span>email</span>
                        </h3>
                        <ul class="employees">
                            ${staffData
								.map(
									(staff) => `
                            <li class="employee">
                                <div class="info">
                                    <img class="avatar" src="${staff.url}" alt="avatar">
                                    <p class="name">${staff.ename}</p>
                                </div>
                                <p class="birthday">${staff.mail}</p>
                                <button class="delete" onclick="deleteEmployeeHandler(event,${staff.eid})">
                                    <ion-icon name="trash-outline"></ion-icon>
                                </button>
                            </li>
                            `,
								)
								.join("")}
                        </ul>
                    </div>
                </div>
    `;
	contentEl.innerHTML = staffHTML;
	staffAnimation();
}

function staffAnimation() {
	const tl_staff = gsap.timeline();
	tl_staff.fromTo(".link", { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.1 });
	tl_staff.fromTo("h2", { opacity: 0, y: -10 }, { opacity: 1, y: 0 }, "<30%");
	tl_staff.fromTo(".branch-details", { opacity: 0, x: 20 }, { opacity: 1, x: 0 }, "<");
	tl_staff.fromTo(".form", { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "<30%");
	tl_staff.fromTo(".right-side", { opacity: 0, x: 15 }, { opacity: 1, x: 0 }, "<30%");
	tl_staff.fromTo(".employee", { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.1 }, "<");
}
