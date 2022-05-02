import { mount } from '@vue/test-utils'
import CardContainer from "~/components/Containers/CardContainer.vue";


test("should render default component", () => {
	const wrapper = mount(CardContainer);
	const header = wrapper.find(".card-header");
	const content = wrapper.find(".card-content");
	const footer = wrapper.find(".card-footer");
	expect(header.exists()).toBe(false);
	expect(content.exists()).toBe(false);
	expect(footer.exists()).toBe(false);
})

test("should render title", () => {
	const wrapper = mount(CardContainer, {
		props: {
			title: "Hello"
		}
	});
	
	const header = wrapper.find( ".card-header" );
	expect(header.exists()).toBe( true );
	expect(header.text()).toContain( "Hello" );
})

test("should render slots", () => {
	const wrapper = mount(CardContainer, {
		slots: {
			"controls": "Controls Slot",
			"content": "Content Slot",
			"footer": "Footer Slot",
		}
	})
	const header = wrapper.find(".card-header");
	const content = wrapper.find(".card-content");
	const footer = wrapper.find(".card-footer");
	expect(header.exists()).toBe(true);
	expect(content.exists()).toBe(true);
	expect(footer.exists()).toBe(true);
	expect(header.text()).toContain( "Controls Slot" );
	expect(content.text()).toContain( "Content Slot" );
	expect(footer.text()).toContain( "Footer Slot" );
})