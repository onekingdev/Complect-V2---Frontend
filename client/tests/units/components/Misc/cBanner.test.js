import { mount } from '@vue/test-utils'
import cBanner from "~/components/Misc/cBanner.vue";


test("should render default type", async () => {
	const wrapper = mount(cBanner, {
		props: {
			message: "Hello World!"
		}
	})
	const title = wrapper.find(".title");
	const message = wrapper.find(".message");
	expect(wrapper.props( "message" )).toBe( "Hello World!" );
	expect(title.exists()).toBe(false);
	expect(message.text()).toContain("Hello World!");
	expect(wrapper.props("type")).toBe("info");
	expect(wrapper.classes("info")).toBe(true);
})

test("should render custom types", async () => {
	const wrapper = mount(cBanner, {
		props: {
			message: "Hello World!"
		}
	})

	const banners = [
		{ title: "Info Banner", type: "info" },
		{ title: "Success Banner", type: "success" },
		{ title: "Warning Banner", type: "warning" },
		{ title: "Error Banner", type: "error" }
	]

	for (const banner of banners) {
		await wrapper.setProps(banner);
		expect(wrapper.props( "type" )).toBe( banner.type );
		expect(wrapper.props( "title" )).toBe( banner.title );
		expect(wrapper.classes( banner.type )).toBe( true );
		const title = wrapper.find( ".title" );
		expect(title.text()).toContain( banner.title );
	}
})